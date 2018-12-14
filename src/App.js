import React, { Component } from "react";
import { Switch, Route, NavLink } from "react-router-dom";
import { withRouter, Redirect } from "react-router";

import axios from "axios";
import "./App.css";

import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import HomePage from "./components/HomePage/HomePage.js";
import LandingPage from "./components/LandingPage/LandingPage.js";
import TattoistList from "./components/TattoistList/TattoistList.js";
import TattoistPersonalPage from "./components/TattoistDetails/TattoistDetails.js";
// -------------------------------------------
import SignupPage from "./components/SignupPage/SignupPage.js";
import LoginPage from "./components/LoginPage/LoginPage.js";
import NotFound from "./components/NotFound.js";
import ResetPassword from "./components/ResetPassword/ResetPassword.js";

import TattoistSignupPage from "./components/TattoistSignupPage/TattoistSignupPage.js";
import TattoistLoginPage from "./components/TattoistLoginPage/TattoistLoginPage.js";
// -------------------------------------------
import MapContainer from "./components/MapContainer.js";
import GoogleApiWrapperCode from "./components/MapContainer.js";
import Dnd from "./components/CalendarPage/Calendar.js";
import ClientView from "./components/CalendarPage/ClientCalendar";
import PlacesAutocomplete from "react-places-autocomplete";
// -------------------------------------------
import SearchBar from "./components/SearchBar.js";
//------------------------------------
import Profile from "./components/ProfilePage/ProfilePage.js";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: null,
      citySearchQuery: ""
    };
  }

  // ----------- checkuser------------------------------------
  componentDidMount() {
    axios
      .get(`${process.env.REACT_APP_API_URL}/checkuser`, {
        withCredentials: true
      })
      .then(response => {
        console.log("Check User", response.data);
        const { userDoc } = response.data;
        this.syncCurrentUser(userDoc);

        // ----------- checkTattoist------------------------------------
        axios
          .get(`${process.env.REACT_APP_API_URL}/checkTattoist`, {
            withCredentials: true
          })
          .then(response => {
            console.log("Check Tattoist", response.data);
            const { userDoc } = response.data;
            this.syncCurrentUser(userDoc);
          })
          .catch(err => {
            console.log("check user ERROR", err);
            alert("Sorry! Something went wrong with check Tattoist");
          });
      })
      .catch(err => {
        console.log("check user ERROR", err);
        alert("Sorry! Something went wrong");
      });
  }

  // this is the method for updating "currentUser"
  // (must be defined in App.js since it's the owner of "currentUser" now)
  syncCurrentUser(userDoc) {
    this.setState({ currentUser: userDoc });
  }

  syncSearchedLocation(locationSearchDoc) {
    this.setState({ citySearchQuery: locationSearchDoc }, () => {
      console.log(this.state);
    });
  }

  logoutClick() {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/logout`, {
        withCredentials: true
      })
      .then(() => {
        //make "currentUser" empty again (like it was at the start)
        this.syncCurrentUser(null);

        //--------------tattoist logout-------------------------------------
        axios
          .delete(`${process.env.REACT_APP_API_URL}/tattoist-logout`, {
            withCredentials: true
          })
          .then(() => {
            this.syncCurrentUser(null);
          })
          .catch(err => {
            console.log("Logout ERROR", err);
            alert("Sorry! Something went wrong. Logout");
          });
      })
      .catch(err => {
        console.log("Logout ERROR", err);
        alert("Sorry! Something went wrong. Logout");
      });
  }

  render() {
    return (
      <div className="App">
        <div>
          {this.props.location.pathname !== "/login-page" &&
            this.props.location.pathname !== "/tattoist-login-page" && (
              <nav className="navbar-user-dropdown flex">
                <NavLink exact to="/">
                  <img src="/images/logo-header.svg" alt="logo" />
                </NavLink>

                {this.state.currentUser ? (
                  <span className="flex">
                    <NavLink
                      className="white padding-l-r-14 extra-style font-size-20px"
                      to="/tattoist-profile"
                    >
                      {this.state.currentUser.fullName}
                      {this.state.currentUser.name}
                    </NavLink>

                    
                    <button
                      className="extra-style font-size-20px"
                      onClick={() => this.logoutClick()}
                    >
                      Log Out
                    </button>
                  </span>
                ) : (
                  <span className="flex">
                    <span className="flex ">{/* <p>Are you:</p> */}</span>
                    {this.props.location.pathname !== "/tattoist-signup-page" &&
                      this.props.location.pathname !== "/signup-page" && (
                        <div className="flex">
                          <NavLink
                            className="white extra-style font-size-20px"
                            to="/signup-page"
                          >
                            For Clients
                          </NavLink>

                          <NavLink
                            className="white extra-style font-size-20px"
                            to="/tattoist-signup-page"
                          >
                            For Tattoist
                          </NavLink>
                        </div>
                      )}

                    {/* {this.props.location.pathname !== "/tattoist-signup-page" &&
                      this.props.location.pathname !== "/" && (
                        <p className="white extra-style">
                          <NavLink
                            className="white extra-style"
                            to="/login-page"
                          >
                            Log In
                          </NavLink>
                          as a Client
                        </p>
                      )} */}

                    {/* {this.props.location.pathname !== "/signup-page" &&
                      this.props.location.pathname !== "/" && (
                        <p className="white extra-style">
                          <NavLink
                            className="white extra-style"
                            to="/tattoist-login-page"
                          >
                            Log In
                          </NavLink>{" "}
                          as Tattoist
                        </p>
                      )} */}
                  </span>
                )}
              </nav>
            )}
          {/* --------------------------------------------------- */}
          <Switch>
            {/* Route is important: allow you to define the URL in "path"*/}
            {/* Use "render" instead of "component" to pass props */}

            <Route
              exact
              path="/"
              render={() => (
                <LandingPage
                  onUserInput={locationSearchDoc =>
                    this.syncSearchedLocation(locationSearchDoc)
                  }
                  currentuser={this.state.currentUser}
                  // component={LandingPage}
                />
              )}
            />

            {/* Use "render" instead of "component" to pass props */}
            <Route
              path="/tattoist-profile"
              render={() =>
                this.state.currentUser ? (
                  <Profile currentuser={this.state.currentUser} />
                ) : (
                  <Redirect to="/" />
                )
              }
            />
            {/* Use "render" instead of "component" to pass props */}
            <Route
              path="/tattoistList/:tattoistId"
              component={TattoistPersonalPage}
            />
            <Route
              path="/tattoistlist"
              render={() =>
                this.state.citySearchQuery ? (
                  <TattoistList
                    searchedLocation={this.state.citySearchQuery}
                    currentuser={this.state.currentUser}
                  />
                ) : (
                  <Redirect to="/" />
                )
              }
            />

            <Route path="/MapContainer" component={MapContainer} />
            {/* Use "render" instead of "component" to pass props */}

            {/* --------------------------- Signups ------------------------ */}

            <Route
              path="/signup-page"
              render={() => (
                <SignupPage
                  currentuser={this.state.currentUser}
                  onUserChange={userDoc => this.syncCurrentUser(userDoc)}
                />
              )}
            />

            <Route
              path="/tattoist-signup-page"
              render={() => (
                <TattoistSignupPage
                  currentuser={this.state.currentUser}
                  onUserChange={userDoc => this.syncCurrentUser(userDoc)}
                />
              )}
            />

            {/* --------------------------- Logins ------------------------- */}
            <Route
              path="/login-page"
              render={() => (
                <LoginPage
                  // CA CEST UNE PROP, INFORMATION DESCENDANTE
                  currentUser={this.state.currentUser}
                  // CA CEST UNE FONCTION POUR RECUPERER UNE INFO DE LA LOGIN PAGE
                  onUserChange={userDoc => this.syncCurrentUser(userDoc)}
                />
              )}
            />

            <Route
              path="/tattoist-login-page"
              render={() => (
                <TattoistLoginPage
                  // CA CEST UNE PROP, INFORMATION DESCENDANTE
                  currentUser={this.state.currentUser}
                  // CA CEST UNE FONCTION POUR RECUPERER UNE INFO DE LA LOGIN PAGE
                  onUserChange={userDoc => this.syncCurrentUser(userDoc)}
                />
              )}
            />
            {/* --------------------------- reset password ------------------------- */}
            <Route path="/reset-password" component={ResetPassword} />

            <Route
              path="/calendar"
              render={() => <Dnd currentUser={this.state.currentUser} />}
              component={Dnd}
            />

            <Route
              path="/search"
              render={() => (
                <SearchBar
                  onUserInput={locationSearchDoc =>
                    this.syncSearchedLocation(locationSearchDoc)
                  }
                  currentuser={this.state.currentUser}
                  component={SearchBar}
                />
              )}
            />

            {/* --------------------------- NotFound ------------------------- */}
            {/* 404 route LAST */}
            <Route component={NotFound} />
          </Switch>
        </div>

        {/* --------------------------- footer ------------------------- */}
        {this.props.location.pathname !== "/tattoist-login-page" &&
          this.props.location.pathname !== "/login-page" && (
            <footer>Made with ❤️ and bugs at IRONHACK</footer>
          )}
      </div>
    );
  }
}

export default withRouter(App);
