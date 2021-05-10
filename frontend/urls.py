from django.urls import path
from .views import index

# Finally we add this view to the frontend URLs. We have to add it twice, first to catch 
# the empty URL
urlpatterns = [
    path('', index), # for the empty url
    path(r'^.*/$', index) # for all other urls
]
