from django.contrib.auth.decorators import login_required
from django.shortcuts import render

from documents.models import DocumentStorage


@login_required
def index(request):
    docs = DocumentStorage.get_user_documents(request.user)
    print(docs)
    return render(request, 'doc_index.html', {'docs': docs})

