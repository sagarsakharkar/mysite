# mysite/firstsite/apis/account/models.py

import os
from PIL import Image
from uuid import uuid4

from django.db import models
from django.contrib.auth.models import AbstractUser


def get_file_path(instance, filename):
    ext = filename.split('.')[-1]
    # get filename
    if instance.username:
        filename = '{}.{}'.format(instance.username, ext)
    else:
        # set filename as random string
        filename = '{}.{}'.format(uuid4().hex, ext)
    # return the whole path to the file
    return os.path.join('profile_pics', filename)


class Role(models.Model):
    name = models.CharField(max_length=100, null=True, blank=True)

    def __str__(self):
        return self.name


class User(AbstractUser):
    avatar = models.ImageField(
        default='defaults/user_profile.jpg', upload_to=get_file_path
    )

    role = models.ForeignKey(Role, on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return f'Profile {self.username}'

    def save(self, *args, **kwargs):
        if not self.first_name:
            self.first_name = self.username.split('.')[0]
            self.last_name = self.username.split('.')[1] if len(self.username.split('.')) > 1 else "" 
        super().save(*args, **kwargs)

        img = Image.open(self.avatar.path)

        if img.height > 300 or img.width > 300:
            output_size = (300, 300)
            img.thumbnail(output_size)
            img.save(self.avatar.path)