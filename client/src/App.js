import React, { Component } from 'react';
import './App.css';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { Card, Button, Form, CardTitle, CardText, FormGroup, Label, Input} from 'reactstrap';

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
    haveUsersLocation: false,
    zoom: 2,
}

componentDidMount(){
  navigator.geolocation.getCurrentPosition(position => {
    this.setState({location: {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    },
    haveUsersLocation: true,
    zoom: 13
    });
   
  },
  () => {
    fetch('https://ipapi.co/json')
    .then(res => res.json())
    .then(location =>{
      this.setState({location: {
        lat: location.latitude,
        lng: location.longitude
      },
      haveUsersLocation: true,
      zoom: 13
      });
    });
  });
}

  render() {
    const position = [this.state.location.lat, this.state.location.lng]
    return (
      <React.Fragment className='map'>
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
<Card body className='message-form'>
  <CardTitle>Welcome to Guestmap!</CardTitle>
  <CardText>Leave a message with your location!</CardText>
  <CardText>Thanks for stopping by!</CardText>
  <Form>
        <FormGroup>
          <Label for="name">Name</Label>
          <Input plaintext value="Enter your name!" id="name" type="text" name="name"/>
        </FormGroup>
        <FormGroup>
          <Label for="message">Message</Label>
          <Input plaintext value="Enter a message!" id="message" type="textarea" name="message"/>
        </FormGroup>
        <Button color="info" type="submit">Send</Button>
  </Form>
</Card>
</React.Fragment>
    );
  }
}

export default App;
