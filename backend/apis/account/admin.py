from django.contrib import admin

from .models import User, Role

admin.site.register(Role)
admin.site.register(User)
