import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './App.css';

// https://github.com/foursquare/react-foursquare
var foursquare = require('react-foursquare')({
  clientID: 'redacted',
  clientSecret: 'redacted'
});

let params = {
  "ll": "37.7749,-122.4194",
  "query": 'Blue Bottle'
};
let params2 = {
  'venue_id': '5560dbdb498e91a2bcde84f6'
}


class Foursquare extends Component {

  constructor(props) {
     super(props);
     this.state = {
       items: [],
       // state passed in from app component
       latlng: {'ll': this.props.lattitude.toString() + ',' + this.props.longitude.toString(),
     'query': this.props.titleQuery}
     };
   }


   // make venue detail api request and set as item state
  componentDidMount() {
    foursquare.venues.getVenue(params2)
      .then(res => {
        console.log(res)
        rejection => console.log(rejection)
        this.setState({ items: res.venue });
      });
  }

  render() {
    console.log('foursquare.venues.getVenue: ', foursquare.venues.getVenue)
    console.log('foursquare.venues.getVenue(params2)', foursquare.venues.getVenue(params2))
    console.log('this.state.items: ', this.state.items)

    return (
    <div>
    <div ref='testin'></div>
        { this.state.items.map(item=> { return <div key={item.id}>{item.name}</div>}) }
    </div>
  )
  }
}

export default Foursquare
