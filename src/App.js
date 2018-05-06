import React, { Component } from 'react';
import ReactDOMServer from 'react-dom/server';
import ReactDOM from 'react-dom';
import './App.css';
import Foursquare from './Foursquare.js';
import FilterForm from './FilterForm.js';
import SelectOptions from './SelectOptions';

let map;
let markers = [];
let marker;



class App extends Component {

state = {
    googleMap: [],
    FilteredLocations: [
      {title: '23 And Me', location: {lat: 37.395208, lng: -122.079159}, venueID: '4ae8903bf964a5206eb021e3'},
      {title: 'Mountain View High School', location: {lat: 37.359605, lng: -122.066855}, venueID: '4acfcafff964a5200bd620e3'},
      {title: 'Google', location: {lat: 37.422000, lng: -122.084057}, venueID: '50379c31e4b0be420ec1826a'},
      {title: 'Stanford University', location: {lat: 37.427475, lng: -122.169719}, venueID: '4a983497f964a520f02a20e3'},
      {title: 'Whole Foods', location: {lat: 37.398900, lng: -122.110727}, venueID: '49f8a2e3f964a5200d6d1fe3'},
      {title: 'El Camino Hospital', location: {lat: 37.369124, lng: -122.079870}, venueID: '4a77b401f964a52004e51fe3'},
      {title: 'Starbucks', location: {lat: 37.378540, lng: -122.116718}, venueID: '4740b317f964a520724c1fe3'},
      {title: 'Stanford Dish', location: {lat: 37.408564, lng: -122.179599}, venueID: '4a8723a4f964a520cf0220e3'},
      {title: 'Philz Coffee', location: {lat: 37.377386, lng: -122.031401}, venueID: '547e13a7498e8d4312025ce9'},
      {title: 'Foothill College', location: {lat: 37.360278, lng: -122.126562}, venueID: '49f667e7f964a5203e6c1fe3'}
    ]
  }

  componentDidMount() {
    //http://www.klaasnotfound.com/2016/11/06/making-google-maps-work-with-react/
    //https://www.npmjs.com/package/fetch-google-maps
    const fetchGoogleMaps = require('fetch-google-maps');
    //fetch google maps api and create a new map
    fetchGoogleMaps({
        apiKey: 'redacted',
        language: 'en',
        libraries: ['geometry']
    }).then(( maps ) => {
      const map = new maps.Map(document.getElementById('map'), {
          zoom: 14,
          center: new maps.LatLng(37.395208, -122.079159),
          styles: [{"featureType":"road.highway","elementType":"geometry","stylers":[{"visibility":"on"},{"color":"#cfa406"}]},{"featureType":"landscape.natural","elementType":"all","stylers":[{"color":"#948f94"}]}]
      });
      initMap(map, maps)
    });

    //create map, map markers, and infowindows
    function initMap(map, maps) {

      const google = window.google;

      let locations = [
        {title: '23 And Me', location: {lat: 37.395208, lng: -122.079159}, venueID: '4ae8903bf964a5206eb021e3'},
        {title: 'Mountain View High School', location: {lat: 37.359605, lng: -122.066855}, venueID: '4acfcafff964a5200bd620e3'},
        {title: 'Google', location: {lat: 37.422000, lng: -122.084057}, venueID: '50379c31e4b0be420ec1826a'},
        {title: 'Stanford University', location: {lat: 37.427475, lng: -122.169719}, venueID: '4a983497f964a520f02a20e3'},
        {title: 'Whole Foods', location: {lat: 37.398900, lng: -122.110727}, venueID: '49f8a2e3f964a5200d6d1fe3'},
        {title: 'El Camino Hospital', location: {lat: 37.369124, lng: -122.079870}, venueID: '4a77b401f964a52004e51fe3'},
        {title: 'Starbucks', location: {lat: 37.378540, lng: -122.116718}, venueID: '4740b317f964a520724c1fe3'},
        {title: 'Stanford Dish', location: {lat: 37.408564, lng: -122.179599}, venueID: '4a8723a4f964a520cf0220e3'},
        {title: 'Philz Coffee', location: {lat: 37.377386, lng: -122.031401}, venueID: '547e13a7498e8d4312025ce9'},
        {title: 'Foothill College', location: {lat: 37.360278, lng: -122.126562}, venueID: '49f667e7f964a5203e6c1fe3'}
      ];

      let largeInfoWindow = new google.maps.InfoWindow();
      let bounds = new google.maps.LatLngBounds();
      for (let i = 0; i < locations.length; i++) {
        let position = locations[i].location;
        let title = locations[i].title;
        let venid = locations[i].venueID;
        let marker = new google.maps.Marker({
          map: map,
          position: position,
          title: title,
          markerID: venid,
          animation: google.maps.Animation.DROP,
          id: i
        });

        markers.push(marker);
        bounds.extend(marker.position);

        marker.addListener('click', function(){
          populateInfoWindow(this, largeInfoWindow);
        });
        //open and close infowindow on click + set foursquare component to infowindow content
        function populateInfoWindow(marker, infowindow){
          if (infowindow !== marker) {
            infowindow.marker = marker;

            let passDownParams = marker.position.lat();
            let passDownLng = marker.position.lng();
            let markerTitle = marker.title;
            let placeID = marker.markerID;

            let infowindowDiv = document.createElement('div');
            let foursquareStuff = <Foursquare lattitude={passDownParams} longitude={passDownLng} titleQuery={markerTitle} theVenueID={placeID}/>;
            ReactDOM.render(foursquareStuff, infowindowDiv);
            infowindow.setContent( infowindowDiv );

            infowindow.open(map, marker);
             infowindow.addListener('closeclick', function() {infowindow.setContent(null);});
           }
          }

      }
      //make sure all markers fit on screen
      map.fitBounds(bounds);
     };

     //if the map error's out push an alert to user that something went wrong
     function handleError(google) {
       if (google.error){
           alert('Oops! Looks like something went wrong.');
       }
     }

}

 handleLocationClick(venueID){
  console.log(venueID);
  const clickedMarker = markers.filter((marker) => marker.markerID === venueID);
  console.log(clickedMarker[0].title);
  // this.populateInfoWindow(clickedMarker[0]);
 }

  render() {

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Neighborhood Maps Project</h1>
        </header>
        <div id='map'></div>
        <FilterForm FilteredLocations={this.state.FilteredLocations} handleLocationClick={this.handleLocationClick} />
      </div>
    );
  }
}

export default App;
