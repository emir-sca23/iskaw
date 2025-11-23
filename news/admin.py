from django.contrib import admin
from django.utils.html import format_html
from .models import News

@admin.register(News)
class NewsAdmin(admin.ModelAdmin):
    list_display = ('title', 'date_start', 'is_published', 'image_preview', 'created_at')
    list_filter = ('is_published', 'date_start', 'created_at')
    search_fields = ('title', 'excerpt', 'content')
    prepopulated_fields = {'slug': ('title',)}
    date_hierarchy = 'date_start'
    
    fieldsets = (
        ('Основная информация', {
            'fields': ('title', 'slug', 'is_published')
        }),
        ('Даты', {
            'fields': ('date_start', 'date_end'),
            'description': 'Для одного дня заполните только "Дата начала". Для периода заполните обе даты.'
        }),
        ('Содержимое', {
            'fields': ('excerpt', 'content')
        }),
        ('Изображения', {
            'fields': ('image', 'image_2', 'image_3'),
            'classes': ('collapse',)
        }),
        ('Документы', {
            'fields': ('pdf_file', 'pdf_title'),
            'description': 'Загрузите PDF документ и укажите его название'
        }),
    )
    
    def image_preview(self, obj):
        if obj.image:
            return format_html(
                '<img src="{}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 5px;" />',
                obj.image.url
            )
        return '-'
    image_preview.short_description = 'Превью'

# Настройка админки
admin.site.site_header = 'ISKA Кыргызстан - Админ-панель'
admin.site.site_title = 'ISKA Admin'
admin.site.index_title = 'Управление сайтом'