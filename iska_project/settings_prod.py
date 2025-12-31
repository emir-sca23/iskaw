from .settings import *

DEBUG = False
ALLOWED_HOSTS = config('ALLOWED_HOSTS').split(',')

# База данных PostgreSQL
import dj_database_url
DATABASES = {
    'default': dj_database_url.config(conn_max_age=600)
}

# Безопасность
SECURE_SSL_REDIRECT = True
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
SECURE_BROWSER_XSS_FILTER = True