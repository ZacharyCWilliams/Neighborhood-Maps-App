import React, { Component } from 'react';
import ReactDOMServer from 'react-dom/server';
import ReactDOM from 'react-dom';
import './App.css';


class FilterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null
    };
  }

  componentDidMount() {
    this.setState({ value: this.props.selectors })
  }

  handleFilter(event) {
    console.log(event.target.value)
  }


  render() {
    if (this.state.value){
      console.log('state is loaded! ', this.state.value);
      let firstVenue = this.state.value[0].title;
    }

    return (
      <div>
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" onChange={this.handleFilter} />
        </label>
        <input type="submit" value="Submit" />
      </form>
        <select>
          <option value="v.tit">Strawberry</option>
          <option value="lime">Lime</option>
          <option value="coconut">Coconut</option>
          <option value="mango">Mango</option>
        </select>
      </div>
  )
  }
}

export default FilterForm;
