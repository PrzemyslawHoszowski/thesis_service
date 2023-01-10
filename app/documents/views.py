from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.db import transaction
from django.http import HttpResponse, FileResponse
from django.shortcuts import get_object_or_404
from django.shortcuts import render, redirect
from django.template.loader import render_to_string
from django.views.generic.edit import FormView
from documents.models import DocumentStorage, Document, StoredFile, Event
from identity.models import Identity

from .forms import FileFieldForm


@login_required
def index(request):
    docs = DocumentStorage.get_user_documents(request.user)
    try:
        is_address_assigned = not Identity.objects.get(user=request.user).blockchain_address is None
    except Identity.DoesNotExist:
        is_address_assigned = False
    if not is_address_assigned:
        messages.error(request, "Please assign your blockchain wallet to the account. <a href=\"identity/\">Here</a>")
    return render(request, 'doc_index.html', {'docs': docs, 'is_address_assigned': is_address_assigned})


@login_required
def document_view(request, doc_index):
    try:
        document_storage = DocumentStorage.objects.filter(user=request.user, doc__index=doc_index).get()
        if not document_storage.accepted:
            accept_document_message(request, doc_index)
    except DocumentStorage.DoesNotExist:
        messages.error(request, "Unauthorized")
        return redirect("documents:index")

    if request.method == "POST":
        try:
            new_name = request.POST["new-name"]
            if new_name.strip() != "":
                document_storage.name = new_name
                document_storage.save()
            else:
                messages.error(request, "Invalid name was given.")
        except:
            messages.error(request, "Encountered error during handling change name request.")

    user_identity = Identity.objects.filter(user=request.user).get()
    # todo implement accept document mechanism to allow to share/hide personal data with others
    roles = document_storage.doc.translated_roles()
    user_address = user_identity.blockchain_address

    can_sign = document_storage.doc.can_sign(user_address)
    can_add_user = document_storage.doc.can_add_user(user_address)
    can_edit = document_storage.doc.can_edit(user_address)

    events = Event.objects.filter(document=document_storage.doc).order_by("date")
    events = list(map(lambda event: event.attr_to_list(), events))

    files = StoredFile.objects.filter(fileHashBase16__in=document_storage.doc.files, doc=document_storage.doc)
    files_dict = StoredFile.query_to_dict(files)
    files = []
    for file in document_storage.doc.files:
        file_v = files_dict.get(file)
        if file_v:
            files.append((file_v.name, file_v.fileHashBase16))
        else:
            files.append(("", file))

    return render(request, 'doc_view.html',
                  {
                      'doc': document_storage,
                      'files': files,
                      'roles': roles,
                      'can_sign': can_sign,
                      'can_add_user': can_add_user,
                      'can_edit': can_edit,
                      'events': events,
                  })


@login_required
def get_file(request, doc_index, file_hash):
    doc = get_object_or_404(Document, pk=doc_index)
    try:
        user_address = Identity.get_identity(request.user).blockchain_address
        has_access = user_address in doc.entities()
        if not has_access:
            return HttpResponse('Unauthorized', status=401)
    except:
        return HttpResponse('Unauthorized', status=401)

    file = StoredFile.objects.get(doc=doc, fileHashBase16=file_hash)
    return FileResponse(file.file.open())


class FileFieldFormView(FormView):
    form_class = FileFieldForm
    template_name = 'choose_files.html'

    def get(self, request, *args, **kwargs):
        document_index = kwargs['doc_index']
        form = self.get_form_class()
        doc = get_object_or_404(Document, pk=document_index)
        try:
            user_address = Identity.get_identity(request.user).blockchain_address
            has_access = user_address in doc.entities()
            if not has_access:
                return HttpResponse('Unauthorized', status=401)
        except:
            return HttpResponse('Unauthorized', status=401)

        can_edit = doc.can_edit(user_address)
        attached_files = StoredFile.objects.filter(doc=doc)
        context = {
            'form': form,
            'doc': doc,
            'files': doc.mark_used_files(attached_files),
            'can_edit': can_edit
        }
        return render(request, self.template_name, context)

    def post(self, request, *args, **kwargs):
        document_index = kwargs['doc_index']
        form_class = self.get_form_class()
        form = self.get_form(form_class)
        files = request.FILES.getlist('files')
        if form.is_valid():
            doc = get_object_or_404(Document, pk=document_index)
            try:
                user_address = Identity.get_identity(request.user).blockchain_address
                has_access = user_address in doc.entities()
                if not has_access:
                    return HttpResponse('Unauthorized', status=401)
            except:
                return HttpResponse('Unauthorized', status=401)

            can_edit = doc.can_edit(user_address)
            new_files = []
            if can_edit:
                with transaction.atomic():
                    for f in files:
                        stored_file = StoredFile.save_or_get_file(doc, f)
                        new_files.append(stored_file.fileHashBase16)
            else:
                messages.error(request, "Can't edit document")

            attached_files = StoredFile.objects.filter(doc=doc)
            context = {
                'form': form,
                'doc': doc,
                'files': doc.mark_used_files(attached_files, new_files),
                'can_edit': can_edit
            }
            return render(request, self.template_name, context)
        else:
            return self.form_invalid(form)


def accept_document_message(request, doc_index):
    messages.info(request, render_to_string('accept_document.html', {'doc_index': doc_index}, request=request))


@login_required
def action(request, doc_index):
    user_action = request.GET["action"]
    doc_storage = DocumentStorage.objects.get(user=request.user, doc__index=doc_index)
    if user_action == "Accept":
        doc_storage.accepted = True
        doc_storage.save()
        messages.info(request, "Document has been accepted")
        return redirect("documents:doc", doc_index)
    elif user_action == "Hide":
        doc_storage.hidden = True
        doc_storage.save()
        messages.info(request, "Document has been hidden")
        return redirect("documents:index")
    messages.error(request, "Got invalid query")
    return redirect('documents:index')
