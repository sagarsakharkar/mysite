# from django.views.generic import TemplateView
# from django.views.decorators.cache import never_cache
from django.shortcuts import render

# # Serve Single Page Application
# index = never_cache(TemplateView.as_view(template_name='index.html'))


def index(request):
    return render(request, "index.html")
