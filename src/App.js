import React, { Component } from 'react';
import ReactDOMServer from 'react-dom/server';
import ReactDOM from 'react-dom';
import './App.css';
import Foursquare from './Foursquare.js';
import FilterForm from './FilterForm.js';;

let _this;
let map;
let markers = [];
let marker;
let largeInfoWindow;
let locationState = [
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

class App extends Component {

state = {
    googleMap: [],
    initialLocations: locationState,
    filteredLocations: locationState,
    markerIdentification: null
  }


  componentDidMount() {
    _this = this
    //http://www.klaasnotfound.com/2016/11/06/making-google-maps-work-with-react/
    //https://www.npmjs.com/package/fetch-google-maps
    const fetchGoogleMaps = require('fetch-google-maps');
    //fetch google maps api and create a new map
    fetchGoogleMaps({
        apiKey: 'AIzaSyC7uYChVm0w8cDKMlGmon0XbJDUiiBBc4g',
        language: 'en',
        libraries: ['geometry']
    }).then(( maps ) => {
      const map = new maps.Map(document.getElementById('map'), {
          zoom: 14,
          center: new maps.LatLng(37.395208, -122.079159),
          styles: [{"featureType":"road.highway","elementType":"geometry","stylers":[{"visibility":"on"},{"color":"#cfa406"}]},{"featureType":"landscape.natural","elementType":"all","stylers":[{"color":"#948f94"}]}]
      });
      this.initMap(map, maps)
    }).catch(err => {
      alert(err)
    });
}
//create map, map markers, and infowindows
 initMap(map, maps) {
  const google = window.google;

  let locations = this.state.filteredLocations

  largeInfoWindow = new google.maps.InfoWindow();
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

    marker.addListener('click', () => {
      marker.setAnimation(google.maps.Animation.BOUNCE);
      this.populateInfoWindow(marker, largeInfoWindow);
    });
  }
  // make sure all markers fit on screen
  map.fitBounds(bounds);
 };
 // open and close infowindow on click + set foursquare component to infowindow content
 populateInfoWindow(marker, infowindow){
   if (infowindow !== marker) {
     infowindow.marker = marker;
     let markerLat = marker.position.lat();
     let markerLon = marker.position.lng();
     let markerTitle = marker.title;
     let placeID = marker.markerID;

     let infowindowDiv = document.createElement('div');
     let foursquareStuff = <Foursquare lattitude={markerLat} longitude={markerLon} titleQuery={markerTitle} theVenueID={placeID}/>;
     ReactDOM.render(foursquareStuff, infowindowDiv);
     infowindow.setContent( infowindowDiv );

     infowindow.open(map, marker);
      infowindow.addListener('closeclick', function() {infowindow.setContent(null);});
    }
   }
  // Filter menu options on text input
  handleTextFilter(event){
    let initialState = this.state.initialLocations
    let updatedState = initialState.filter(thisVenue => {
       return thisVenue.title.toLowerCase().search(event.target.value.toLowerCase()) !== -1
    })
    this.setState(prevState => ({ filteredLocations: updatedState}))
  }
// Activate Info Window on menu click
 handleLocationClick(venueID) {
  const clickedMarker = markers.filter((marker) => marker.markerID === venueID);
  _this.populateInfoWindow(clickedMarker[0], largeInfoWindow);
 }

  render() {
// before rendering check filtered state for map markers
    let markersToShow = []
    let markersToHide = []
    let renderMarkers = markers
    let renderedLocations = this.state.filteredLocations
    let moveThisID = []
    renderedLocations.map(location => {
       moveThisID.push(location.venueID)})
// loop through lists and display/hide corresponding markers
    for (let t = 0; t < moveThisID.length; t++) {
      for (let p = 0; p < renderMarkers.length; p++) {
        if (moveThisID[t] === renderMarkers[p].markerID) {
          markersToShow.push(renderMarkers[p])
          markersToShow.forEach(mark => {
            mark.setVisible(true)
          });
        } else if (moveThisID[t] !== renderMarkers[p].markerID) {
            markersToHide.push(renderMarkers[p])
            markersToHide.forEach(mark => {
            mark.setVisible(false)
          });
          } else {
            alert('oops! that didn\'t work')
          }
        }
      }

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Neighborhood Maps Project</h1>
        </header>
        <div id='map'></div>
        <FilterForm FilteredLocations={this.state.filteredLocations} handleTextFilter={this.handleTextFilter.bind(this)} handleLocationClick={this.handleLocationClick} />
      </div>
    );
  }
}

export default App;
