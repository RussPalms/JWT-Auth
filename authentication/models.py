from django.db import models
# added
from django.contrib.auth.models import AbstractUser

# CustomUser extends from AbstractUser which gives us access to the standard Django 
# User model attributes and functionalities such as username, password, and so on.
class CustomUser(AbstractUser):
    fav_color = models.CharField(blank=True, max_length=120)

