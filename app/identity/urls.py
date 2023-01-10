from django.urls import path

from . import views

app_name = 'identity'
urlpatterns = [
    path('', views.index, name='index'),
    path('certificate.pem', views.certificate, name="certificate"),
    path('<int:document_index>/<str:address>', views.document_identity, name='identity'),
    path('<int:document_index>/certificate/<str:address>.pem', views.document_user_certificate, name='identity_certificate'),
    path('signup/', views.sign_up, name='sign_up'),
    path('tokens/', views.RequestTokensFormView.as_view(), name='tokens'),
    path('activate/<str:uidb64>/<str:token>/', views.activate, name='activate')
]
