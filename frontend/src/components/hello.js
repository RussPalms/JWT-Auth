import React, { Component } from "react";
import axiosInstance from "../axiosApi";

class Hello extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: "",
        };

        this.getMessage = this.getMessage.bind(this)
    };

    async getMessage() {
        try {
            // const header = localStorage.getItem("access_token");
            // console.log(header);
            // for testing
            let response = await axiosInstance.get('/hello/');
            const message = response.data.hello;
            this.setState({
                message: message,
            });
            return message;
        } 
            catch(error) {
                console.log("Hello error: ", JSON.stringify(error, null, 4));
                // throw error; todo
            }
    };

    /* when the component is mounted/loaded, the componentDidMount method is fired. 
    Since we want to get this message RIGHT AWAY, this is the right place to trigger our 
    GET request.*/ 
    componentDidMount() {
        // It's not the most straightforward thing to run an async method in componentDidMount

        // Version 1 - no async: Console.log will output something undefined.
        // const messageData1 = this.getMessage();
        // console.log("messageData1: ", JSON.stringify(messageData1, null, 4));
        // this.getMessage();
    }

    render() {
        return (
            <div>
                <p>{this.state.message}</p>
            </div>
        )
    };
}

export default Hello;