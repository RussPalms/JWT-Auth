from django.shortcuts import render

# This view renders the index.html that will be the base template for everything React. 
# All it needs to do is render the template.
def index(request):
    return render(request, 'frontend/index.html', context=None)