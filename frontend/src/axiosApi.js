import axios from 'axios';

const baseURL = 'http://127.0.0.1:8000/api/';
/*To create an Axios instance, import it and use the .create() method with the custom 
configuration to set the defaults. Set the baseURL to where the backend API is served from. 
The headers are important. In settings.py the SIMPLE_JWT dict sets the AUTH_HEADER_TYPES as 
‘JWT’ so for the Authorization header here it has to be the same. Don’t neglect to add the 
space after JWT in axiosAPI.js. Also do NOT put a space in settings.py. */ 
const axiosInstance = axios.create({
    // where the backend is being served
    // baseURL: 'http://127.0.0.1:8000/api/',
    baseURL: baseURL,
    // the time the token expires which in this case is defined (in our backend) to 
    // be 5 minutes
    timout: 5000,
    // the header is where the JWT is passed through
    headers: {
        // this is the data that is being passed between the frontend and backend
        // 'Authorization': "JWT " + localStorage.getItem('access_token'),
        'Authorization': 
            localStorage.getItem('access_token') 
                ? "JWT " + localStorage.getItem('access_token') 
                : null,
        'Content-Type': 'application/json',
        'accept': 'application/json'
    }
});

axiosInstance.interceptors.response.use(
    response => response,
    error => {
        const originalRequest = errot.config;

        // bug fixes to prefent infinite loops
        if (error.response.status 
            === 404 && originalRequest.url 
            === baseURL + 'token/refresh/') {
                window.location.href = '/login/';
                return Promise.reject(error);
            }
        
            if (error.response.data.code === "token_not_valid" &&
                error.response.status === 401 &&
                error.response.statusText === "Unauthorized")
                {
                    const refreshToken = localStorage.getItem('refresh_token');

                    if (refreshToken) {
                        const tokenParts = JSON.parse(atob(refreshToken.split('.')[1]));

                        // exp date in token is expressed in seconds, while now() returns
                        // milliseconds:

                        const now = Math.ceil(Date.now() / 1000);
                        console.log(tokenParts.exp);

                        if (tokenParts.exp > now) {
                            return axiosInstance
                            .post('/token/refresh/', {refresh: refreshToken})
                            .then((response) => {

                                localStorage.setItem('access_token', response.data.access);
                                localStorage.setItem('refresh_token', response.data.refresh);

                                axiosInstance.defaults.headers['Authorization'] 
                                    = "JWT " + response.data.access;
                                originalRequest.headers['Authorization']
                                    = "JWT " + response.data.access;
                                return axiosInstance(originalRequest);
                            })
                                .catch(err => {
                                    console.log(err)
                                });     
                        }
                            else {
                                console.log("Refresh token is expired", tokenParts.exp, now);
                                window.location.href = '/login/';
                            }      
                    }
                        else {
                            console.log("Refresh token not available.")
                            window.location.href = '/login/';
                        }
                }
                    // specific error handling done elsewhere
                    // return Promise.reject(error);

        // // if (error.response.status === 401 && error.response.statusText === "Unauthorized") {
        // if (localStorage.getItem('refresh_token') 
        //     && error.response.status 
        //     === 401 
        //     && error.response.statusText 
        //     === "Unauthorized") 
        //     {
        //         const refresh_token = localStorage.getItem('refresh_token');

        //         return axiosInstance
        //             .post('/token/refresh/', {refresh: refresh_token})
        //             .then((response) => {

        //                 localStorage.setItem('access_token', response.data.access);
        //                 localStorage.setItem('refresh_token', response.data.refresh);

        //                 axiosInstance.defaults.headers['Authorization'] 
        //                     = "JWT " + response.data.access;
        //                 originalRequest.headers['Authorization'] 
        //                     = "JWT " + response.data.access;
                                
        //                 return axiosInstance(originalRequest);
        //             })
        //                 .catch(err => {
        //                     console.log(err)
        //                 });
        //     }
        //     // return Promise.reject(error);
            return Promise.reject({...error});
    }
);

export default axiosInstance;