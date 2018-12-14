import React, { Component } from "react";
import axios from "axios";
import { Redirect, NavLink } from "react-router-dom";
// import { GoogleLogin } from "react-google-login";
import "./LoginPage.css";

class LoginPage extends Component {
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

  // loginWithGoogle(res, type) {
  //   //axios request

  //   const googleInfo = {
  //     email: res.profileObj.email,
  //     name: res.profileObj.givenName,
  //     surname: res.profileObj.familyName
  //   };

  //   axios
  //   .post(`${process.env.REACT_APP_API_URL}/api/google/google-login`, googleInfo, {
  //     withCredentials: true
  //   })
  //   .then(response => {
  //     console.log("Login Page", response.data);
  //     const { userDoc } = response.data;
  //     // send "userDoc" to the App.js function that changes "currentUser"
  //     this.props.onUserChange(userDoc);
  //   })
  //   .catch(err => {
  //     console.log("Login Page Error", err);
  //     alert("Sorry! Something went wrong. Google client login");
  //   });
  // }

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
        console.log("Login Page ERROR", err);
        alert("Sorry! Something went wrong. Login");
      });
  }

  render() {

    // const errorGoogle = response => {
    //   console.log("fail google console", response);
    //   this.loginWithGoogle(response, " fail google");
    // };

    // const responseGoogle = response => {
    //   console.log("google console", response);
    //   this.loginWithGoogle(response, "google");
    // };

    // check currentUser (received from App.js)
    if (this.props.currentUser) {
      return <Redirect to="/" />;
    }
    return (
      <section className="LoginPage hei-100vh">
        <div>
          <div className="login-div">
            <h2>Log in to your account</h2>

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

              <label>
                <input
                  className="margin-top-20"
                  value={this.state.originalPassword}
                  onChange={event => this.genericSync(event)}
                  type="password"
                  name="originalPassword"
                  placeholder="Password:"
                />
              </label>

              <button className=" margin-top-20">
                <p>Log In</p>
              </button>

            {/* <GoogleLogin
              className="margin-top-20"
              clientId="269725925185-fum6n1delt2mdkhn2hgj2h2q99eck1rm.apps.googleusercontent.com"
              buttonText="Login with Google"
              redirectUri=""
              onSuccess={responseGoogle}
              onFailure={errorGoogle}
            /> */}
            </form>

            <p>
              <NavLink to="/signup-page"> Sign Up</NavLink> as client
            </p>
            <p>
              <NavLink to="/tattoist-signup-page"> Sign Up</NavLink> as tattoist
            </p>
          </div>

          <div>
            <NavLink className="margin-top-20 flex j-cont-center white" to="/reset-password">
              Forgot your Password?
            </NavLink>
          </div>
        </div>
      </section>
    );
  }
}

export default LoginPage;
