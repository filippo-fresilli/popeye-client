import React, { Component } from "react";
import axios from "axios";
import { Redirect, NavLink } from "react-router-dom";
import "./ResetPassword.css";

class ResetPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      originalPassword: ""
    };
  }

  genericSync(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();

    axios
      .post(`${process.env.REACT_APP_API_URL}/api/login`, this.state, {
        withCredentials: true
      })
      .then(response => {
        console.log("Login Page", response.data);
        const { userDoc } = response.data;
        // send "userDoc" to the App.js function that changes "currentUser"
        this.props.onUserChange(userDoc);
      })
      .catch(err => {
        console.log("Reset password ERROR", err);
        alert("Sorry! Something went wrong resetting password");
      });
  }

  render() {
    // check currentUser (received from App.js)
    if (this.props.currentUser) {
      return <Redirect to="/" />;
    }
    return (
      <section className="LoginPage hei-100vh">
        <div>
          <div className="login-div">
            <h2>Reset Password</h2>

            <form
              className="login-form pad-40"
              onSubmit={event => this.handleSubmit(event)}
            >
              <label>
                <input
                  value={this.state.email}
                  onChange={event => this.genericSync(event)}
                  type="email"
                  name="email"
                  placeholder="Email address:"
                />
              </label>

              <button className=" margin-top-20">
                <p>Reset Password</p>
              </button>
            </form>
          </div>

          <div className="flex j-cont-center">
            <NavLink
              className="margin-top-20 white"
              to="/login-page"
            >
              Log In
            </NavLink>
            <p> or </p> 
            <NavLink
              className="margin-top-20 white"
              to="/signup-page"
            >
              Sign Up
            </NavLink>
          </div>
        </div>
      </section>
    );
  }
}

export default ResetPassword;
