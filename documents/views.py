from django.contrib.auth.decorators import login_required
from django.shortcuts import render

from documents.models import DocumentStorage, Document


@login_required
def index(request):
    # todo if blockchain address isn't assigned to account notify user instead of showing add_document button
    docs = DocumentStorage.get_user_documents(request.user)
    return render(request, 'doc_index.html', {'docs': docs})

@login_required
def document_view(request, doc_index):
    document_storage = DocumentStorage.objects.filter(user=request.user, doc__index=doc_index).get()
    # todo implement accept document mechanism to allow to share personal data with others
    roles =  document_storage.doc.translated_roles()
    return render(request, 'doc_view.html', {'doc': document_storage, 'roles': roles})

