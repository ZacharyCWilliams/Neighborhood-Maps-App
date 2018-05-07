import React, { Component } from 'react';
import ReactDOMServer from 'react-dom/server';
import ReactDOM from 'react-dom';
import './App.css';


function FilterForm(props){

    let locationsList = props.FilteredLocations.map((location) =>
									<li className="myLi" key={location.venueID} onClick={()=> props.handleLocationClick(location.venueID)}><a>{location.title}</a></li>
								 );

    return (
      <div>
      <form>
        <label>
          <input type="text" id="myInput" />
          <ul id="myUL">
            {locationsList}
          </ul>
        </label>
      </form>
      </div>
  );

}


export default FilterForm;
