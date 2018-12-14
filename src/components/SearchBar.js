import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage/LandingPage.css";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";

class LocationSearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: "",
      adresseToCoordinates: "",
      isSubmitSuccessful: false,
      inputValue: ""
    };
  }

  handleChange = address => {
    this.setState({ address });
  };

  handleSelect = address => {
    this.setState({ address });

    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        this.setState({ adresseToCoordinates: latLng });
        this.props.handleEvent(latLng);
      })
      .catch(error => console.error("Error", error));
  };

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    console.log(this.state);
    return (
      <div className={`search-bar ${this.props.className}`}>
        <PlacesAutocomplete
          value={this.state.address}
          onChange={this.handleChange}
          onSelect={this.handleSelect}
        >
          {({
            getInputProps,
            suggestions,
            getSuggestionItemProps,
            loading
          }) => (
            <div className="searchElement">
              <form onSubmit={event => this.handleSubmit(event)}>
                <input
                  value={this.state.inputValue}
                  onChange={event => this.handleChange(event)}
                  {...getInputProps({
                    placeholder: "Choose city ...",
                    className: ""
                  })}
                />
              </form>

              <div className="autocomplete-dropdown-container">
                {loading && <div>Loading...</div>}
                {suggestions.map(suggestion => {
                  const className = suggestion.active
                    ? "suggestion-item--active"
                    : "suggestion-item";
                  // inline style for demonstration purpose
                  const style = suggestion.active
                    ? { backgroundColor: "#fafafa", cursor: "pointer" }
                    : { backgroundColor: "#ffffff", cursor: "pointer" };
                  return (
                    <div
                      {...getSuggestionItemProps(suggestion, {
                        className,
                        style
                      })}
                    >
                      <span>{suggestion.description}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </PlacesAutocomplete>
      </div>
    );
  }
}
export default LocationSearchInput;
