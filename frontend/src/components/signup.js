import React, { Component } from 'react';
import axiosInstance from '../axiosApi';

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            email: "",
            errors:{}
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    async handleSubmit(event) {
        // for testing
        // alert(
        //     'A username and password were submitted: '
        //     + this.state.username
        //     + " "
        //     + this.state.password
        //     + " "
        //     + this.state.email
        // );
            event.preventDefault();
            try {
                const response = await axiosInstance.post('/user/create/', {
                    username: this.state.username,
                    email: this.state.email,
                    password: this.state.password
                });
                return response;
            }
                catch(error) {
                    console.log(error.stack);
                    // added after creating an empty tuple for authenticated users in backend
                    this.setState({
                        errors:error.response.data
                    });
                }
    }

    render() {
        return (
            <div>
                Signup
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Username:
                        <input
                            name="username"
                            type="text"
                            value={this.state.username}
                            onChange={this.handleChange}
                        />
                        {/* Ternary operators like this are done in this format:
                        { Boolean ? (content to show if True) : (content to show if False) */}
                        {/* For a properly made DRF API View, when encountering errors, 
                        it will return those errors in JSON form in the response. We log 
                        the error and set the state directly to the JSON object containing 
                        the error messages. Every time the state is set, it triggers a 
                        re-render of the component — in this case that would render the 
                        error messages. */}
                        { this.state.errors.username ? this.state.errors.username : null }
                    </label>
                    <label>
                        Email:
                        <input
                            name="email"
                            type="email"
                            value={this.state.email}
                            onChange={this.handleChange}
                        />
                        { this.state.errors.email ? this.state.errors.email: null }
                    </label>
                    <label>
                        Password:
                        <input
                            name="password"
                            type="password"
                            value={this.state.password}
                            onChange={this.handleChange}
                        />
                        { this.state.errors.password ? this.state.errors.password : null }
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        )
    };
}

export default Signup;