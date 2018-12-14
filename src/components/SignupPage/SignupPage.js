import React, { Component } from "react";
import axios from "axios";
import "./SignupPage.css";
import { Redirect, NavLink } from "react-router-dom";
// import { GoogleLogin } from "react-google-login";
import { PostData } from "../../PostData.js";

class SignupPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      name: "",
      surname: "",
      originalPassword: "",
      confirmPassword: "",
      phoneNumber: "",
      currentUser: null,
      redirect: false,
    };
  }

  genericSync(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  // signupWithGoogle(res, type) {
  //   //axios request

  //   const googleInfo = {
  //     email: res.profileObj.email,
  //     name: res.profileObj.givenName,
  //     surname: res.profileObj.familyName
  //   };

  //   axios
  //     .post(`${process.env.REACT_APP_API_URL}/api/api/google/google-signup`, googleInfo, {
  //       withCredentials: true
  //     })
  //     .then(response => {
  //       console.log("Signup Page", response.data);
  //       const { userDoc } = response.data;
  //       // send "userDoc" to the App.js function that changes "currentUser"
  //       this.props.onUserChange(userDoc);
  //     })
  //     .catch(err => {
  //       console.log("Signup Page Error", err);
  //       alert("Sorry! Something went wrong. Google client signup");
  //     });
  // }

  handleSubmit(event) {
    const { originalPassword, confirmPassword } = this.state;

    event.preventDefault();

    if (originalPassword !== confirmPassword) {
      alert("Passwords don't match.");
    } else {
      // make API call

      axios
        .post(`${process.env.REACT_APP_API_URL}/api/signup`, this.state, {
          withCredentials: true
        })
        .then(response => {
          console.log("Signup Page", response.data);
          const { userDoc } = response.data;
          // send "userDoc" to the App.js function that changes "currentUser"
          this.props.onUserChange(userDoc);
        })
        .catch(err => {
          console.log("Signup Page Error", err);
          alert("Sorry! Something went wrong. Signup");
        });
    }
  }

  render() {
    // const errorGoogle = response => {
    //   console.log("fail google console", response);
    //   this.signupWithGoogle(response, " fail google");
    // };

    // const responseGoogle = response => {
    //   console.log("google console", response);
    //   this.signupWithGoogle(response, "google");
    // };

    if (this.props.currentUser) {
      return <Redirect to="/" />;
      //   <section className="SignupPage">
      //     <h2>You are signed up!</h2>
      //     <p>Welcome, {this.props.currentUser.name}!</p>
      //   </section>
      // );
    }

    return (
      <section className="SignupPage">
        <div className="signup-div">
          <h2>Create an Account</h2>

          <p className="">
            <NavLink className="" to="/login-page">
            Log In
            </NavLink>
            as a Client
          </p>

          <form
            className="signup-form pad-40"
            onSubmit={event => this.handleSubmit(event)}
          >
            <label>
              <input
                className=""
                value={this.state.name}
                onChange={event => this.genericSync(event)}
                type="text"
                name="name"
                placeholder="Name"
              />
            </label>

            <label>
              <input
                className="margin-top-20"
                value={this.state.surname}
                onChange={event => this.genericSync(event)}
                type="text"
                name="surname"
                placeholder="Surname"
              />
            </label>

            <label>
              <input
                className="margin-top-20"
                value={this.state.phoneNumber}
                onChange={event => this.genericSync(event)}
                type="number"
                name="phoneNumber"
                placeholder="Phone Number"
              />
            </label>

            <label>
              <input
                className="margin-top-20"
                value={this.state.email}
                onChange={event => this.genericSync(event)}
                type="email"
                name="email"
                placeholder="Email Adress"
              />
            </label>

            <label>
              <input
                className="margin-top-20"
                value={this.state.originalPassword}
                onChange={event => this.genericSync(event)}
                type="password"
                name="originalPassword"
                placeholder="Password"
              />
            </label>

            <label>
              <input
                className="margin-top-20"
                value={this.state.confirmPassword}
                onChange={event => this.genericSync(event)}
                type="password"
                name="confirmPassword"
                placeholder="Repeat Password"
              />
            </label>

            <button className="margin-top-20">
              <p>Sign Up</p>
            </button>
            {/* <GoogleLogin
              className="margin-top-20"
              clientId="269725925185-fum6n1delt2mdkhn2hgj2h2q99eck1rm.apps.googleusercontent.com"
              buttonText="Signup with Google"
              redirectUri=""
              onSuccess={responseGoogle}
              onFailure={errorGoogle}
            /> */}
          </form>

          <p>
            <NavLink to="/tattoist-signup-page"> Sign Up</NavLink> as Tattoist
          </p>
        </div>
      </section>
    );
  }
}

export default SignupPage;
