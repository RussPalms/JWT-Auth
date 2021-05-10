import React, { Component } from "react";
import { Switch, Route, Link } from 'react-router-dom';
import Login from "./login";
import Signup from "./signup";
import Hello from "./hello";
import axiosInstance from "../axiosApi";


class App extends Component {

    constructor() {
        super();
        this.handleLogout = this.handleLogout.bind(this);
    }

    /*The button triggers handleLogout() when clicked. Handle logout posts the refresh 
    token to the blackout API View to black it out, and then deletes access and refresh 
    tokens from localStorage, while resetting the Authorization header for the axios 
    instance. Need to do both, otherwise Axios will still be able to get authorized access 
    to protected view.*/ 
    async handleLogout() {
        try {
            const response = await axiosInstance.post('/blacklist/', {
                "refresh_token": localStorage.getItem("refresh_token")
            });
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            axiosInstance.defaults.headers['Authorization'] = null;
            return response;
        }
            catch(e) {
                console.log(e);
            }
    };
    
    render() {
        return (
            // This is our first React component! Awesome. Note that React uses 
            // className rather than class. 
            <div className="site">
                {/* Still using good habits, we of course put it all in a <nav> element. In 
                React, don’t use <a href=””>, use React router’s <Link> component, which we have 
                to for React router to work correctly with the history API. For now, add the class 
                “nav-link” for some bare-minimum "styling." */}
                <nav>
                    {/* It’s tedious to type a URL each time we want to test it, so let’s 
                    add a couple links to App.js to save us some keystrokes */}
                    <Link className={"nav-link"} to={"/"}>Home</Link>
                    <Link className={"nav-link"} to={"/login/"}>Login</Link>
                    <Link className={"nav-link"} to={"/signup/"}>Signup</Link>
                    <Link className={"nav-link"} to={"/hello/"}>Hello</Link>
                    <button onClick={this.handleLogout}>Logout</button>
                </nav>
                <main>
                    <h1>Suh . . .</h1>
                    {/* Using the <main> HTML element is a good habit, so we add that for 
                    our main content. Within that we add a <Switch> block which lets React 
                    know that in that space we will switch rendered components depending on 
                    the defined routes.  */}
                    <Switch>
                        <Route exact path={"/login/"} component={Login}/>
                        <Route exact path={"/signup/"} component={Signup}/>
                        <Route exact path={"/hello/"} component={Hello}/>
                        <Route path={"/"} render={() => <div>Home again</div>}/>
                    </Switch>                
                </main>
            </div>
        );
    }
}

export default App;