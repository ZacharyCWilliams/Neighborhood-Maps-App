import React, { Component } from 'react';
import ReactDOMServer from 'react-dom/server';
import ReactDOM from 'react-dom';
import './App.css';

class FilterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.selectors
    };
    this.handleFilter = this.handleFilter.bind(this)
  }

  handleFilter(event) {
      let input, filter, ul, li, a, i;
      input = document.getElementById("myInput");
      filter = input.value.toUpperCase();
      ul = document.getElementById("myUL");
      li = ul.getElementsByTagName("li");
      for (i = 0; i < li.length; i++) {
          a = li[i].getElementsByTagName("a")[0];
          if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
              li[i].style.display = "";
          } else {
              li[i].style.display = "none";

          }
      }
  }

  handleOnClick() {
    console.log('this worked')
  }

  render() {
    return (
      <div>
      <form onSubmit={this.handleSubmit}>
        <label>
          <input type="text" id="myInput" onChange={this.handleFilter} />
          <ul id="myUL">
            <li className="myLi"><a onClick={this.handleOnClick}>{this.state.value[0].title}</a></li>
            <li className="myLi"><a onClick={this.handleOnClick}>{this.state.value[1].title}</a></li>
            <li className="myLi"><a onClick={this.handleOnClick}>{this.state.value[2].title}</a></li>
            <li className="myLi"><a onClick={this.handleOnClick}>{this.state.value[3].title}</a></li>
            <li className="myLi"><a onClick={this.handleOnClick}>{this.state.value[4].title}</a></li>
            <li className="myLi"><a onClick={this.handleOnClick}>{this.state.value[5].title}</a></li>
            <li className="myLi"><a onClick={this.handleOnClick}>{this.state.value[6].title}</a></li>
            <li className="myLi"><a onClick={this.handleOnClick}>{this.state.value[7].title}</a></li>
            <li className="myLi"><a onClick={this.handleOnClick}>{this.state.value[8].title}</a></li>
            <li className="myLi"><a onClick={this.handleOnClick}>{this.state.value[9].title}</a></li>
          </ul>
        </label>
      </form>
      </div>
  )
  }
}

export default FilterForm;
