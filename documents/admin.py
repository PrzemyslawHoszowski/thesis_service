from django.contrib import admin

from documents.models import Document, Event, DocumentStorage, StoredFile

# Register your models here.
admin.site.register(Document)
admin.site.register(Event)
admin.site.register(DocumentStorage)
admin.site.register(StoredFile)
