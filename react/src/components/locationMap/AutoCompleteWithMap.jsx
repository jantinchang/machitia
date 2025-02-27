import React from "react";
import {
  Autocomplete,
  LoadScript,
  GoogleMap,
  Marker,
} from "@react-google-maps/api";
import logger from "sabio-debug";
import "./googleMap.css";
import PropTypes from "prop-types";
const googleMapApiKey = process.env.REACT_APP_GOOGLE_APIKEY;
const _logger = logger.extend("GoogleMapAutocomplete");
const libraries = ["places"];
const mapContainerStyle = {
  height: "400px",
  width: "800px",
};

class AutoCompleteWithMap extends React.Component {
  constructor(props) {
    super(props);
    this.autocomplete = null;
    this.onLoad = this.onLoad.bind(this);
    this.onPlaceChanged = this.onPlaceChanged.bind(this);
  }

  onLoad(autocomplete) {
    this.autocomplete = autocomplete;
    _logger("autocomplete: ", autocomplete);
  }

  onPlaceChanged() {
    if (this.autocomplete !== null) {
      let selected = this.autocomplete.getPlace();
      _logger(selected);
      let location = this.getAdressObj(selected.address_components);
      _logger(location);
      location.latitude = selected.geometry.location.lat();
      location.longitude = selected.geometry.location.lng();

      this.props.handlePlaceChange(location);
    } else {
      _logger("Autocomplete is not loaded yet!");
    }
  }

  getAdressObj = (components) => {
    let address = {};
    Object.keys(components).forEach((key) => {
      address[components[key].types[0]] = components[key].long_name;
    });
    return address;
  };

  render() {
    return (
      <LoadScript googleMapsApiKey={googleMapApiKey} libraries={libraries}>
        <Autocomplete onLoad={this.onLoad} onPlaceChanged={this.onPlaceChanged}>
          <input
            type="text"
            placeholder="Search Address"
            className="form-control"
          />
        </Autocomplete>
        <GoogleMap
          id="searchbox-example"
          mapContainerStyle={mapContainerStyle}
          zoom={10}
          center={this.props.center}
        >
          <Marker position={this.props.center} />
        </GoogleMap>
      </LoadScript>
    );
  }
}

AutoCompleteWithMap.propTypes = {
  handlePlaceChange: PropTypes.func.isRequired,
  center: PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number,
  }),
};

export default AutoCompleteWithMap;
