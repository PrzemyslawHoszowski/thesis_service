from django.urls import path

from . import views

app_name = 'identity'
urlpatterns = [
    path('', views.index, name='index'),
    path('<str:identity_id>', views.certificate, name="certificate"),
    path('signup/', views.sign_up, name='sign_up'),
    path('tokens/', views.RequestTokensFormView.as_view(), name='tokens'),
    path('activate/<str:uidb64>/<str:token>/', views.activate, name='activate')
]
