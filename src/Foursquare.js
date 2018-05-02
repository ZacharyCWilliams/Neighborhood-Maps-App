import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './App.css';

// https://github.com/foursquare/react-foursquare
var foursquare = require('react-foursquare')({
  clientID: 'redacted',
  clientSecret: 'redacted'
});

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
     'query': this.props.titleQuery},
      // venue id
      venid: { 'venue_id': this.props.theVenueID }
    };
   }


   // make venue detail api request and set as item state
  componentDidMount() {
    foursquare.venues.getVenue(this.state.venid)
      .then(res => {
        console.log('res: ', res)
        this.setState({ items: res.response.venue });
        console.log('state: ', this.state.items)
      });
  }

  render() {
    return (
    <div>
    <div ref='testin'></div>
      <div key={this.state.items.id}>
      <h3>{this.state.items.name}</h3>
      </div>
    </div>
  )
  }
}

export default Foursquare
