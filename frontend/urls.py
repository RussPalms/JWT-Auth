from django.urls import path
from django.conf.urls import url
from .views import index

# Finally we add this view to the frontend URLs. We have to add it twice, first to catch 
# the empty URL
urlpatterns = [
    # for the empty url
    path('', index), 
    # for all other urls, regex matches, then lets routing be handled the frontend. Still needs a / at end.
    url(r'^.*/$', index),
]