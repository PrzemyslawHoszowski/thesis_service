from django.contrib.auth.decorators import login_required
from django.db import transaction
from django.shortcuts import render
from django.views.generic.edit import FormView
from django.shortcuts import get_object_or_404

from .forms import FileFieldForm
from documents.models import DocumentStorage, Document, StoredFile
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
    print(roles)
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

class FileFieldFormView(FormView):
    form_class = FileFieldForm
    template_name = 'choose_files.html'

    # make login verification
    def get(self, request, *args, **kwargs):
        document_index = kwargs['doc_index']
        form = self.get_form_class()
        doc = get_object_or_404(Document, pk=document_index)
        attached_files = StoredFile.objects.filter(doc=doc)
        context = {
            'form': form,
            'doc': doc,
            'files': doc.mark_used_files(attached_files)
        }
        return render(request, self.template_name, context)
    def post(self, request, *args, **kwargs):
        document_index = kwargs['doc_index']
        form_class = self.get_form_class()
        form = self.get_form(form_class)
        files = request.FILES.getlist('files')
        if form.is_valid():
            doc = get_object_or_404(Document, pk=document_index)
            new_files = []
            with transaction.atomic():
                for f in files:
                    stored_file = StoredFile.save_or_get_file(doc, f)
                    new_files.append(stored_file.fileHashBase16)


            attached_files = StoredFile.objects.filter(doc=doc)
            context = {
            'form': form,
            'doc': doc,
            'files': doc.mark_used_files(attached_files, new_files)
            }
            return render(request, self.template_name, context)
        else:
            return self.form_invalid(form)


