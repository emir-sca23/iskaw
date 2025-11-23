from django.shortcuts import render
from django.views.generic import ListView, DetailView
from .models import News

def index(request):
    """Главная страница с 3 последними новостями"""
    latest_news = News.objects.filter(is_published=True).order_by('-date_start')[:3]
    return render(request, 'index.html', {
        'latest_news': latest_news
    })

class NewsListView(ListView):
    """Страница со всеми новостями"""
    model = News
    template_name = 'news.html'
    context_object_name = 'all_news'
    paginate_by = 9
    
    def get_queryset(self):
        return News.objects.filter(is_published=True)

class NewsDetailView(DetailView):
    """Страница отдельной новости"""
    model = News
    template_name = 'news_detail.html'
    context_object_name = 'news'
    slug_field = 'slug'
    
    def get_queryset(self):
        return News.objects.filter(is_published=True)

# Дополнительные статические страницы
def leadership(request):
    """Страница руководства"""
    return render(request, 'leadership.html')

def coaches(request):
    """Страница тренеров"""
    return render(request, 'coaches.html')

def rules(request):
    """Страница правил"""
    return render(request, 'rules.html')

def disciplines(request):
    """Страница дисциплин"""
    return render(request, 'disciplines.html')