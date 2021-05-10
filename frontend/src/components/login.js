import React, { Component } from 'react';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {username: "", password: ""};
        /*It’s super important to bind this to each class method in the constructor, or 
        else this will be undefined in the callback.*/ 
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    /*To the two other input fields (username, password) we set the onChange property to a 
    method called handleChange. Whenever the content of that input field changes, when a 
    keystroke occurs, it triggers the handleChange method to do what we want it to do, 
    which is to update the local component state to match the entered text value for each 
    input field using setState.*/ 
    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    // First, look at the HTML of the form. When the form is submitted, it triggers the 
    // onSubmit method, which we have written as handleSubmit. This method will handle what 
    // we want it to do after the user submits the form. In this case, what we want it to 
    // do is alert us with the data that has been input.
    handleSubmit(event) {
        alert(
            'A username and password was submitted: ' 
            + this.state.username 
            + " " 
            + this.state.password
        );
        // Normally a submission would trigger a reload or redirect, so by adding in 
        // preventDefault() that unwanted behavior can be stopped.
        event.preventDefault();
    }

    render() {
        return (
            <div>
                Login
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Username:
                        <input 
                            name="username" 
                            type="text" 
                            value={this.state.username} 
                            onChange={this.handleChange} 
                        />
                    </label>
                    <label>
                        Password:
                        <input
                            name="password"
                            type="password"
                            value={this.state.password}
                            onChange={this.handleChange}
                        />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        )
    };
}

export default Login;