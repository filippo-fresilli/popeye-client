import React, { Component } from "react";
import axios from "axios";
import "./TattoistSignupPage.css";
import { Redirect, NavLink } from "react-router-dom";
import LocationSearchInput from "../SearchBar.js";

class TattoistSignupPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      fullName: "",
      city: "",
      originalPassword: "",
      confirmPassword: "",
      phoneNumber: "",
      adress: "",
      coordinates: [],
      currentUser: null
    };
  }

  genericSync(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  syncCoordinates(latLng) {
    const { lat, lng } = latLng;
    this.setState({ coordinates: [lng, lat] });
  }

  handleSubmit(event) {
    const { originalPassword, confirmPassword } = this.state;

    event.preventDefault();

    if (originalPassword !== confirmPassword) {
      alert("Passwords don't match.");
    } else {
      // make API call

      axios
        .post(`${process.env.REACT_APP_API_URL}/tattoist-signup`, this.state, {
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
          alert("Sorry! Something went wrong. Tattoist signup");
        });
    }
  }

  render() {
    if (this.props.currentUser) {
      return <Redirect to="/tattoist-profile" />;
      //   <section className="SignupPage">
      //     <h2>You are signed up!</h2>
      //     <p>Welcome, {this.props.currentUser.name}!</p>
      //   </section>
      // );
    }

    return (
      <section className="TattoistSignupPage">
        <div className="signup-div">
          <h2>Create a Tattoist Account</h2>
          <p className="">
            <NavLink className="" to="/tattoist-login-page">
              Log In
            </NavLink>{" "}
            as Tattoist
          </p>
          <form
            className="signup-form pad-40"
            onSubmit={event => this.handleSubmit(event)}
          >
            <label>
              <input
                className=""
                value={this.state.fullName}
                onChange={event => this.genericSync(event)}
                type="text"
                name="fullName"
                placeholder="Name"
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
              <LocationSearchInput
                className="margin-top-20 z-indexplus1 "
                handleEvent={latLng => this.syncCoordinates(latLng)}
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

            <button className="z-index-1 margin-top-20">
              <p>Sign Up</p>
            </button>
          </form>
          <p>
            <NavLink to="/signup-page"> Sign Up</NavLink> as a Client
          </p>
        </div>
      </section>
    );
  }
}

export default TattoistSignupPage;
