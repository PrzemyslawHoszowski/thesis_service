from django.urls import path

from . import views

app_name = 'documents'
urlpatterns = [
    path('', views.index, name='index'),
    path('document/<int:doc_index>', views.document_view, name='doc'),
    path('document/<int:doc_index>/files', views.FileFieldFormView.as_view(), name='doc_files'),
]
