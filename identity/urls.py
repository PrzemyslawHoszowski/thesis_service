from django.urls import path

from . import views

app_name = 'identity'
urlpatterns = [
    path('', views.index, name='index'),
]
