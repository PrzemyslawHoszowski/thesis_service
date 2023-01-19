"""
Django settings for service project.

Generated by 'django-admin startproject' using Django 3.2.6.

For more information on this file, see
https://docs.djangoproject.com/en/3.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/3.2/ref/settings/
"""
import os
from pathlib import Path

import environ
from OpenSSL import crypto

env = environ.Env()
environ.Env.read_env()

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = env("DJANGO_SECRET_KEY")

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = env("DJANGO_DEBUG", default=False)

ALLOWED_HOSTS = env("DJANGO_ALLOWED_HOSTS",
                    default="hoszowski-inzynierka.pl,212.127.93.66,192.168.0.119,127.0.0.1,localhost").split(",")

CSRF_TRUSTED_ORIGINS = ['https://hoszowski-inzynierka.pl:1337', 'http://hoszowski-inzynierka.pl:1337',
                        'https://localhost:1337', "http://localhost:1337"]

# SECURE_CROSS_ORIGIN_OPENER_POLICY = None

# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'identity.apps.IdentityConfig',
    'documents.apps.DocumentsConfig',
    'compressor',
    'compressor_toolkit',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'service.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / "templates"],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'service.wsgi.application'

# Database
# https://docs.djangoproject.com/en/3.2/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': env("DB_NAME", default="thesis"),
        'USER': env("DB_USER", default="thesis"),
        'PASSWORD': env("DB_PASSWORD", default="thesis"),
        'HOST': env("DB_HOST", default="localhost"),
        'PORT': env("DB_PORT", default="5433"),
    }
}

# Password validation
# https://docs.djangoproject.com/en/3.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# Internationalization
# https://docs.djangoproject.com/en/3.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'Europe/Warsaw'

USE_I18N = True

USE_L10N = True

USE_TZ = True

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.2/howto/static-files/

STATIC_ROOT = BASE_DIR / 'staticfiles'
STATIC_URL = '/static/'
MEDIA_ROOT = 'media'
MEDIA_URL = '/media/'
STATICFILES_DIRS = (
    os.path.join(BASE_DIR, 'static'),
)

# compressor settings
STATICFILES_FINDERS = (
    'django.contrib.staticfiles.finders.FileSystemFinder',
    'django.contrib.staticfiles.finders.AppDirectoriesFinder',
    'compressor.finders.CompressorFinder',
)

COMPRESS_CSS_FILTERS = [
    'compressor.filters.css_default.CssAbsoluteFilter',
    'compressor.filters.cssmin.CSSMinFilter',
    'compressor.filters.template.TemplateFilter'
]
COMPRESS_JS_FILTERS = [
    'compressor.filters.jsmin.JSMinFilter',
]

COMPRESS_PRECOMPILERS = (
    ('module', 'compressor_toolkit.precompilers.ES6Compiler'),
    ('css', 'compressor_toolkit.precompilers.SCSSCompiler'),
)

COMPRESS_CACHEABLE_PRECOMPILERS = (
    'text/coffeescript',
)

COMPRESS_ENABLED = True

# Default primary key field type
# https://docs.djangoproject.com/en/3.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

LOGIN_REDIRECT_URL = "/"
LOGOUT_REDIRECT_URL = "/"

# Email client
EMAIL_USE_TLS = True
EMAIL_HOST = env("EMAIL_HOST", default='smtp.gmail.com')
EMAIL_HOST_USER = env("EMAIL_HOST_USER")
EMAIL_HOST_PASSWORD = env("EMAIL_HOST_PASSWORD")
EMAIL_PORT = env("EMAIL_PORT", default="587")

# Blockchain
BLOCKCHAIN_HOST = env("BLOCKCHAIN_HOST", default="localhost")
BLOCKCHAIN_PORT = env("BLOCKCHAIN_PORT", default="26657")
BLOCKCHAIN_REST_PORT = env("BLOCKCHAIN_REST_PORT", default="1317")

BLOCKCHAIN_CLI = env("BLOCKCHAIN_CLI", default="~/go/bin/thesisd")
BLOCKCHAIN_CLI_ACCOUNT = env("BLOCKCHAIN_CLI_ACCOUNT", default="alice")
BLOCKCHAIN_CLI_GLOBAL_FLAGS = env("BLOCKCHAIN_CLI_GLOBAL_FLAGS", default="")
BLOCKCHAIN_CLI_ACCOUNT_ADDRESS = env("BLOCKCHAIN_ACCOUNT_ADDRESS",
                                     default="cosmos1cren9wyl02qqna0tqs39k0c6a8yfsxgsszhjtk")

# PKI
# noinspection PyTypeChecker
CERTIFICATE = crypto.load_certificate(crypto.FILETYPE_PEM, open("priv/domain.crt", 'rt').read())
CERTIFICATE_PRIVATE_KEY = crypto.load_privatekey(crypto.FILETYPE_PEM, open("priv/domain.key", 'rt').read(),
                                                 passphrase=lambda _: bytes(env("CERTIFICATE_PRIVATE_KEY_PASSWORD"),
                                                                            'ascii'))
