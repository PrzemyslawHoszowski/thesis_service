from django.contrib.auth.decorators import login_required
from django.shortcuts import render

from documents.models import DocumentStorage
from identity.models import Identity


@login_required
def index(request):
    # todo if blockchain address isn't assigned to account notify user instead of showing add_document button
    docs = DocumentStorage.get_user_documents(request.user)
    return render(request, 'doc_index.html', {'docs': docs})

@login_required
def document_view(request, doc_index):
    document_storage = DocumentStorage.objects.filter(user=request.user, doc__index=doc_index).get()
    user_identity = Identity.objects.filter(user=request.user).get()
    # todo implement accept document mechanism to allow to share/hide personal data with others
    roles =  document_storage.doc.translated_roles()
    user_address = user_identity.blockchain_address
    can_sign = user_address in document_storage.doc.signers and \
               user_address not in document_storage.doc.signed
    can_add_user = user_address in document_storage.doc.admins
    can_edit = user_address in document_storage.doc.admins or user_address in document_storage.doc.editors
    return render(request, 'doc_view.html',
                  {
                    'doc': document_storage,
                    'roles': roles,
                    'can_sign': can_sign,
                    'can_add_user': can_add_user,
                    'can_edit': can_edit
                  })
