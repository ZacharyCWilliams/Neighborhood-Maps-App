import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    googleMap: []
  }

  componentDidMount() {
    const url = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCwOnE_44E-CRB8UtxT_7c3OEU8Nw0NrYA&callback=initMap'

    $.getScript(url)
      // if getting the script is successful
      .done(function() {
        initMap();
      })
      // if getting the script fails
      .fail(function() {
        mapError();
      });


      let map;
      //markers array
      let markers = [];


      const initMap = function() {
        const google = window.google;
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 37.395208, lng: -122.079159},
          zoom: 14
        });

      let locations = [
        {title: '23 And Me', location: {lat: 37.395208, lng: -122.079159}},
        {title: 'Mountain View High School', location: {lat: 37.359605, lng: -122.066855}},
        {title: 'Google', location: {lat: 37.422000, lng: -122.084057}},
        {title: 'Stanford University', location: {lat: 37.427475, lng: -122.169719}},
        {title: 'Whole Foods', location: {lat: 37.398900, lng: -122.110727}},
        {title: 'El Camino Hospital', location: {lat: 37.369124, lng: -122.079870}},
        {title: 'Starbucks', location: {lat: 37.378540, lng: -122.116718}},
        {title: 'Stanford Dish', location: {lat: 37.408564, lng: -122.179599}},
        {title: 'Philz Coffee', location: {lat: 37.377386, lng: -122.031401}},
        {title: 'Foothill College', location: {lat: 37.360278, lng: -122.126562}}
      ];
      // foursquare
      // let foursquare = require('react-foursquare')({
      //   clientID: 'JFX1CBGN2IRR4LIVYALKIQRMQ0UHTDIZQL3UT2NOYLQVAAE0',
      //   clientSecret: 'MV3PI22XZUJPISDNPG4BFGQKVGHBQCQ1RRWA2QDB4OJMWVDV'
      // });

      // let fourSquareWindowInfo = GET 'https://api.foursquare.com/v2/venues/VENUE_ID';

      let largeInfoWindow = new google.maps.InfoWindow();
      let bounds = new google.maps.LatLngBounds();
      for (let i = 0; i < locations.length; i++) {
        let position = locations[i].location;
        let title = locations[i].title;
        let marker = new google.maps.Marker({
          map: map,
          position: position,
          title: title,
          animation: google.maps.Animation.DROP,
          id: i
        });

        markers.push(marker);
        bounds.extend(marker.position);

        marker.addListener('click', function(){
          populateInfoWindow(this, largeInfoWindow);
        });
      }

      map.fitBounds(bounds)

      function populateInfoWindow(marker, infowindow) {
      if (infowindow != marker) {
        infowindow.marker = marker;
        infowindow.setContent('<div>' + marker.title + '<div>');
        infowindow.open(map, marker);
        infowindow.addListener('closeclick', function() {infowindow.setMarker(null);});
      }
      }
      }

      const mapError = function(){
        alert('Oops! Looks like something went wrong.')
      }

  }

  render() {



    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Neighborhood Maps Project</h1>
        </header>
        <div id='map'></div>
      </div>
    );
  }
}

export default App;
