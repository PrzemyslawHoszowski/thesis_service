from django.contrib import admin

from documents.models import Document, Event, DocumentStorage

# Register your models here.
admin.site.register(Document)
admin.site.register(Event)
admin.site.register(DocumentStorage)
