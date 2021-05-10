from django.urls import path
from django.conf.urls import url
from .views import index

# Finally we add this view to the frontend URLs. We have to add it twice, first to catch 
# the empty URL
urlpatterns = [
    path('', index), # for the empty url
    url(r'^.*/$', index) # for all other urls, regex matches, then lets routing be handled 
                        # the frontend. Still needs a / at end.
]