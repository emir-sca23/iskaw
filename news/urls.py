from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('news/', views.NewsListView.as_view(), name='news_list'),
    path('news/<slug:slug>/', views.NewsDetailView.as_view(), name='news_detail'),
    path('leadership/', views.leadership, name='leadership'),
    path('coaches/', views.coaches, name='coaches'),
    path('rules/', views.rules, name='rules'),
    path('disciplines/', views.disciplines, name='disciplines'),
]