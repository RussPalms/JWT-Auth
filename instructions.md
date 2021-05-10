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
    -> curl --header "Content-Type: application/json" -X POST http://127.0.0.1:8000/api/token/refresh/ --data '{"refresh":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTYyMTg5MDM2MywianRpIjoiNTU2YzgxZTc4NGI1NDBiZmJhMTA5MTg0ZTBjNGZmMDciLCJ1c2VyX2lkIjo0LCJmYXZfY29sb3IiOiIifQ.XXVT3D5ysGCtTdZMJfqfX3UBM-oORKFOuwcIlIp2ic8"}'
    -> curl --header "Content-Type: application/json" --header "Authorization: JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjIwNjgxMTI3LCJqdGkiOiJjODc5NmIyNDJjYTM0MWY3YTFkZTVlNGE0NmViZjMxNCIsInVzZXJfaWQiOjQsImZhdl9jb2xvciI6IiJ9.2ZgZE7zDF7vl0tzCYMGIERHTBaz_kPln08jTCSGy7ks" -X GET http://127.0.0.1:8000/api/hello/

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
    ******make sure the backend django server is running before your run the frontend

36. Install react-router-dom. We use the -dom variant since we’re building a website, not an app:
    -> npm install --save react-router-dom

37. With the BrowserRouter imported and index.js updated to use it, the next step is to create another couple components we can render depending on the URLs. Make 2 new files: login.js and signup.js in components/. 

38. Two forms are needed for Login and Signup. Signup has username, email, and password fields while login only needs username and password.

39. Within Javascript circles, there are two primary ways to GET/POST/UPDATE/DELETE/whatever data from/to a REST API: Axios and JavaScript’s included Fetch.

40. POSTing to /api/user/create/ to create a userPOSTing to /api/token/obtain/ to login a user and obtain a JWT token pairPOSTing to /api/token/refresh/ to refresh the JWT token pairGETting from the protected /api/hello/ to see what the backend secretly has to say.

41. Install Axios:
    npm install --save axios

42. Axios has two superpowers useful here. First, we can create a standalone instance with custom configurations that can be used throughout the website — this is where we’ll set it to send JWT headers. Second, we can make a custom interceptor for the new Axios instance. The interceptor lets us “do stuff” while handling the request — this is where we’ll handle refreshing tokens. Create a file within src/ called axiosApi.js. 

43. Each time Axios gets a token, it stores the access_token in local storage. We initiate the creation of the Axios instance by getting that token. If there’s no token in local storage, don’t even worry about it for the header. It will be set every time a user logs in.

44. Within our original login.js file, we can now improve handleSubmit to POST to the Django backend’s token creation endpoint /api/token/obtain/ and get a token pair. 

45. Token pair in hand. Can we see the protected view yet? Nope. Nothing in React actually tries to get that info yet. Time for another React component. Make a file called hello.js in the components folder. Within this component we want to do only 1 thing: GET a message from a protected API endpoint on the backend, and display it. We will use our custom Axios instance again.

46. Since we’re using a custom Webpack configuration, using async/await won’t work without some additional elbow grease. Right now, the console will show us a big red ReferenceError: regeneratorRuntime is not defined error and React will break. Googling around will lead you to various StackOverflow Q&As leading to the answer. Just add babel-polyfill to the entry line of webpack.config.js or import it. We had better install that package:
    -> npm install --save-dev babel-polyfill

47. First update npm:
    -> npm update

48. Now set babel-polyfill as the entry point in webpack.config.js.
    <!-- old entry: 
        path.resolve(__dirname, './src/index.js') 
    -->

49. We need to specify an empty list or tuple for authentication_classes in addition to setting permission_classes to convince DRF to open up a view to the public.

50. So if a password doesn’t pass the password validator on the backed Serializer, it would send an error which we store in the state at state.errors.password and if that is present, it shows the error text. Otherwise it shows nothing.

51. Create an API view for blacking out tokens.

52. Next we need to add a button to our navbar to delete the localStorage tokens and to post the token to a blackout API view, which we will make shortly. This will go in App.js for now, but making a dedicated Nav component at this point also makes sense.

53.