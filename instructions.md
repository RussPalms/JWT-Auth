1. Create 2 virtual environments. 1 for python and 1 for node:
    -> py -3 -m venv .venv
    -> source ./venv/Scripts/activate

    **or -> pipenv --python 3.7
         -> pipenv shell

    -> conda create --name JWT-Auth nodejs
    -> conda activate JWT-Auth nodejs
    -> python -m pip install --upgrade pip

2. Install the django rest framework and jwt:
    -> pip install django djangorestframework djangorestframework-simplejwt

3. Start the django project in the current directory:
    -> django-admin startproject djsr

4. Create the authentication app:
    -> python manage.py startapp authentication

5. Add it to installed apps in settings.

6. Start to create the custom user model.

7. Now add it to admin.py.

8. Add the custom user model in settings.

9. Make and run migrations:
    -> python manage.py makemigrations
    -> python manage.py migrate

10. Then make a superuser:
    -> python manage.py createsuperuser
    -> admin
    -> admin@admin.com
    -> admin

11. Run the server:
    -> python manage.py runserver

12. Now Configuring DRF + DRF Simple JWT

13.