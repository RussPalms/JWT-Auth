"""djsr URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include # added include

urlpatterns = [
    path('admin/', admin.site.urls),
    # We need to add the DRF Simple JWT URLs into our project to be able to test 
    # logging in, first.
    path('api/', include('authentication.urls')),
    # Make sure to put this include at the end of urlpatterns. This way, anything not matching 
    # Django URLs will be handled by the frontend, which lets us use React’s router to manage 
    # frontend views while still hosting it on the same server. Thus nicely avoiding CORS 
    # madness.
    path('', include('frontend.urls')),
]
