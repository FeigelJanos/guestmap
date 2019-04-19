import React, { Component } from 'react';
import './App.css';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

var myIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.4.0/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.4.0/dist/images/marker-shadow.png',

  iconSize:     [25, 41], // size of the icon
  shadowSize:   [25, 32], // size of the shadow
  iconAnchor:   [12.5, 41], // point of the icon which will correspond to marker's location
  shadowAnchor: [8.5, 32],  // the same for the shadow
  popupAnchor:  [0, -41] // point from which the popup should open relative to the iconAnchor
});

class App extends Component {
  state = {
    location: { 
                lat: 51.505,
                lng: -0.09
              },
    zoom: 2,
}

componentDidMount(){
  navigator.geolocation.getCurrentPosition(position => {
    this.setState({location: {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    },
    haveUsersLocation: false,
    zoom: 13
    });
  });
}

  render() {
    const position = [this.state.location.lat, this.state.location.lng]
    return (
      <Map className='map' center={position} zoom={this.state.zoom}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {this.state.haveUsersLocation ?
              <Marker position={position} icon={myIcon}>
                <Popup>
                 A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
              </Marker> 
              : '' 
        }

</Map>
    );
  }
}

export default App;
