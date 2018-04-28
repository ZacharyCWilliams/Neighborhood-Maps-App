import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './App.css';


var foursquare = require('react-foursquare')({
  clientID: 'redacted',
  clientSecret: 'redacted'
});

// var params = [
//   {"ll": "37.395208,-122.079159",
//   "query": '23 And Me'},
//   {'ll': '37.359605, -122.066855',
//   'query': 'Mountain View High School'},
//   {"ll": "37.422000, -122.084057",
//   "query": 'Google'},
//   {'ll': '37.427475, -122.169719',
//   'query': 'Stanford University'},
//   {"ll": "37.398900, -122.110727",
//   "query": 'Whole Foods'},
//   {'ll': '37.369124, -122.079870',
//   'query': 'El Camino Hospital'},
//   {"ll": "37.378540, -122.116718",
//   "query": 'Starbucks'},
//   {'ll': '37.408564, -122.179599',
//   'query': 'Stanford Dish'},
//   {"ll": "37.377386, -122.031401",
//   "query": 'Philz Coffee'},
//   {'ll': '37.360278, -122.126562',
//   'query': 'Foothill College'}
// ];


class Foursquare extends Component {

  constructor(props) {
     super(props);
     this.state = {
       items: [],
       latlng: {'ll': this.props.lattitude.toString() + ',' + this.props.longitude.toString(),
     'query': this.props.titleQuery}
     };
   }

  componentDidMount() {
    console.log('we are now inside componentDidMount')
    foursquare.venues.getVenues(this.state.latlng)
      .then(res=> {
        console.log(res);
        this.setState({ items: res.response.venues });
        console.log('items: ', this.state.items);
      });
  }

  render() {
    console.log(this.state.latlng);
    return (
    <div>
        { this.state.items.map(item=> { return <div key={item.id}>{item.name}</div>}) }
    </div>
  )
  }
}

export default Foursquare
