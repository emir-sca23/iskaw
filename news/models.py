from django.db import models
from django.urls import reverse
from django.utils.text import slugify
from django.utils import timezone

class News(models.Model):
    title = models.CharField('Заголовок', max_length=200)
    slug = models.SlugField('URL', max_length=200, unique=True, blank=True)
    date_start = models.DateField('Дата начала', default=timezone.now, help_text='Основная дата или начало периода')
    date_end = models.DateField('Дата окончания', blank=True, null=True, help_text='Оставьте пустым для одного дня')
    excerpt = models.TextField('Краткое описание', max_length=300, 
                               help_text='Краткое описание для карточки новости (до 300 символов)')
    content = models.TextField('Полный текст')
    image = models.ImageField('Главное изображение', upload_to='news_images/')
    image_2 = models.ImageField('Дополнительное изображение 2', upload_to='news_images/', blank=True, null=True)
    image_3 = models.ImageField('Дополнительное изображение 3', upload_to='news_images/', blank=True, null=True)
    
    # PDF файлы
    pdf_file = models.FileField('PDF документ', upload_to='news_pdfs/', blank=True, null=True, 
                                help_text='Загрузите PDF файл (например, программу мероприятия, положение и т.д.)')
    
    created_at = models.DateTimeField('Создано', auto_now_add=True)
    updated_at = models.DateTimeField('Обновлено', auto_now=True)
    is_published = models.BooleanField('Опубликовано', default=True)

    class Meta:
        verbose_name = 'Новость'
        verbose_name_plural = 'Новости'
        ordering = ['-date_start']

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title, allow_unicode=True)
        super().save(*args, **kwargs)

    def get_absolute_url(self):
        return reverse('news_detail', kwargs={'slug': self.slug})

    def get_date_display(self):
        """Возвращает отформатированную дату или период на русском"""
        # Словарь месяцев на русском
        months_ru = {
            1: 'января', 2: 'февраля', 3: 'марта', 4: 'апреля',
            5: 'мая', 6: 'июня', 7: 'июля', 8: 'августа',
            9: 'сентября', 10: 'октября', 11: 'ноября', 12: 'декабря'
        }
        
        if self.date_end and self.date_end != self.date_start:
            # Если диапазон дат
            if self.date_start.month == self.date_end.month:
                # Один месяц: "17-19 ноября 2025"
                month_name = months_ru[self.date_start.month]
                return f"{self.date_start.day}-{self.date_end.day} {month_name} {self.date_start.year}"
            else:
                # Разные месяцы: "30 ноября - 2 декабря 2025"
                month_start = months_ru[self.date_start.month]
                month_end = months_ru[self.date_end.month]
                return f"{self.date_start.day} {month_start} - {self.date_end.day} {month_end} {self.date_end.year}"
        else:
            # Один день: "17 ноября 2025"
            month_name = months_ru[self.date_start.month]
            return f"{self.date_start.day} {month_name} {self.date_start.year}"

    def get_all_images(self):
        """Возвращает список всех изображений новости"""
        images = [self.image]
        if self.image_2:
            images.append(self.image_2)
        if self.image_3:
            images.append(self.image_3)
        return images