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

13. Now to authenticate and get Refresh and Access tokens

14. Make a new urls.py in authentication.

15. Now use CURL with the superuser credentials that were set earlier:
    -> curl --header "Content-Type: application/json" -X POST http://127.0.0.1:8000/api/token/obtain/ --data '{"username":"admin", "password":"admin"}'

16. Now take the refresh token and rerun curl:
    -> curl --header "Content-Type: application/json" -X POST http://127.0.0.1:8000/api/token/refresh/ --data '{"refresh":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTYyMTgyNTQxMSwianRpIjoiODUxOWYwOTliNjk1NDg1NjhjZGZjMmJmMjIwYmU2NWIiLCJ1c2VyX2lkIjoxfQ.O2kyN7Wgc5rX83oh9JydBeotGNE5w39xIbM_Vlpiijw","access":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjIwNjE2MTExLCJqdGkiOiIzNDQxZDRkNTc4N2Y0OWI5OGMzYWYyOWYxYjBjMzdmOSIsInVzZXJfaWQiOjF9.XxVfHjwUNE09eVU3SqjGUPZbN_n3i6czPwC1_repoVE"}'

17. Now create a serializer file in authentication.

18. Now try to see the token again using CURL:
    -> curl --header "Content-Type: application/json" -X POST http://127.0.0.1:8000/api/token/obtain/ --data '{"username":"admin", "password":"admin"}'

19. We don’t need to do anything to our CustomUser model, but we need to make a serializer for it, and put that in a view with a URL.

20. You’re going to have to make sure to test it at this point, since if this view is restricted to authenticated users only, you’ll get exactly 0 new users. They would be unhappy and your odds of getting an investor go way up when you have users. That means, more CURLing:
    -> curl --header "Content-Type: application/json" -X POST http://127.0.0.1:8000/api/user/create/ --data '{"email":"boyouu@fookme.org","username":"shmafu","password":"eatmenow"}'

***
21. Now create a protected view. This is were we would start creating the patient post signin/signup page
***

22. If we CURL again, the API request without the token will fail:
    -> curl --header "Content-Type: application/json" -X POST http://127.0.0.1:8000/api/hello

23. Now try again, but with an authenticated user:
    -> curl --header "Content-Type: application/json" -X POST http://127.0.0.1:8000/api/token/obtain/ --data '{"email":"snaper@fookme.org","username":"sachyou","password":"eatmenow"}'
    -> curl --header "Content-Type: application/json" -X GET http://127.0.0.1:8000/api/hello/
    <!-- this is the access token -->
    -> curl --header "Content-Type: application/json" --header "Authorization: JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjIwNjE5NDY4LCJqdGkiOiJjNDk4Y2NlZGQ5NjY0NGRlYWFjNTQ2YjY1N2U5Nzc0ZiIsInVzZXJfaWQiOjQsImZhdl9jb2xvciI6IiJ9.iKLQdWXzKvON45cluHkzksNfHUHD-oicYEcwz3Zh3fk" -X GET http://127.0.0.1:8000/api/hello/

24. First we logged new user Ichiro in, then tried a GET request on our protected endpoint. It’s still rejected, because we didn’t actually pass the token, even though we can see it with our naked eyes. It has to be passed in the header. This is why it’s key to remember that earlier in settings.py we set “JWT” in the AUTH_HEADER_TYPES. 
In the header, the token MUST be preceeded by “Authorization: JWT “ + access token. Or whatever you set AUTH_HEADER_TYPES as. Otherwise, no dice. This will become important when we connect the frontend.

25. Make a new django app to hold React and add it to installed apps:
    -> python manage.py startapp frontend

26. In frontend make a templates/frontend/index.html, style.css and urls.py file, which will act as the base template for React along with a regular Django rendered index view. In this particular template, Django template context processors are available to use, which can be incredibly useful if you want to control how React behaves from within settings.py. Let’s prepare it like a standard Django base template, for now.

27. Before you start working with npm you need to change the configuration:
    -> npm config set prefix "${APPDATA}/npm"

28. Now start working on react by initializing npm:
    -> npm init

29. With our index.html ready and waiting, we have to figure out how to create and compile something for it to grab and present. This requires Babel and Webpack:
    -> npm install --save-dev @babel/core@7.4.5 @babel/preset-env@7.4.5 @babel/preset-react@7.0.0
    Babel takes the code we write in whatever we use and turns it into JavaScript browsers love. babel/preset-env is for modern Javascript ES6+ and babel/preset-react for JSX.

30. To use our freshly installed Babel, we must create a .babelrc or babel.config.json file in the project root, next to package.json.

31. Webpack is a bundler. It takes our modules (dependencies and custom code both) and converts them into static assets. This infographic from their website https://webpack.js.org does a good job of illustrating how it works:
    -> npm install --save-dev webpack webpack-cli babel-loader
        <!-- + babel-loader@8.0.6
        + webpack-cli@3.3.4
        + webpack@4.35.0 -->

32. Create a webpack.config.js at the root next to packages.json.

33. Now install react:
    -> npm install --save react react-dom
    <!-- + react@16.8.6
    + react-dom@16.8.6 -->

34. Added 
        "scripts": {
        "build": "webpack - config webpack.config.js",
    to package.json

35. Now you can build:
    -> npm run build
