import React, { Component } from "react";
import axios from "axios";
import MapContainer from "../MapContainer.js";
import "./TattoistDetails.css";
//import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
class TattoistPersonalPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //we need the portfolio array to avoid error with  ".map()"
      portfolio: [],
      coordinates: []
    };
  }

  componentWillMount() {
    console.log("blah WILL MOUNT", this.state);
  }

  componentDidMount() {
    const { params } = this.props.match;

    axios
      .get(`${process.env.REACT_APP_API_URL}/api/tattoistList/${params.tattoistId}`, {
        withCredentials: true
      })
      .then(response => {

        const {
          portfolio,
          picture,
          fullName,
          adress,
          description,
          geometry
        } = response.data;
        console.log("response from database front", response.data)
        this.setState(
          {
            portfolio,
            picture,
            fullName,
            adress,
            description,
            coordinates: geometry.coordinates
          },
        );
      })
      .catch(err => {
        alert("Something wrong with the Tattoist details");
      });
  }

  render() {
    const {
      picture,
      fullName,
      adress,
      description,
      portfolio,
      coordinates
    } = this.state;

    return (
      <section className="TattoistDetails">
        <h2>TattoistDetails</h2>
        <div className="TattoistDetailsTop">
          <div className="personal-container">
            <img src={picture} alt={fullName} />
            <h3>{fullName}</h3>
          </div>
          <div className="adress-container">
            <h4 className="adress">adress: {adress}</h4>
            <div className="MapConteiner">
              <MapContainer
                coordinates={coordinates}
                fullName={this.state.fullName}
              />
            </div>
          </div>
        </div>

        <h4>{description}</h4>

        <div className="images-container">
          {portfolio.map((oneImage, index) => {
            return (
              <div key={index}>
                <img className="image" src={oneImage} alt={oneImage} />
              </div>
            );
          })}
        </div>
      </section>
    );
  }
}

export default TattoistPersonalPage;
