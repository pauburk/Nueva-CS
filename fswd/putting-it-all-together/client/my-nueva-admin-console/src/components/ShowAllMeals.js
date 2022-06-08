import React, { Component } from 'react';
import axios from 'axios';
import { Outlet, Link } from 'react-router-dom';
import NuevanCard from './NuevanCard';

class ShowAllMeals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuItems: []
    };
  }

  componentDidMount() {
    axios
      //TODO: fill in the GET call below with the appropriate URL
      //look at routes
      .get('http://localhost:8082/list')
      .then(res => {
        //TODO: Fill this in with the appropriate state information
        //from whatever the response is
        // console.log(res.data)
        this.setState(
            {menuItems: res.data}
        )
      })
      .catch(err =>{
        console.log('Error from ShowAllMeals');
      })
  };


  render() {
    //get our list from our state
    const menuItems = this.state.menuItems;
    let menuItemsList;

    //determine what to render based on if our state is populated
    if(!menuItems) {
      menuItemsList = "There is nothing in the database yet";
    } else {
      //map our list from our state
      //see NuevanCard for how we are rendering the Card
      menuItemsList = menuItems.map((item, k) =>
        <NuevanCard nuevanInfo={item} key={k} />
      );
    }

    return (
      <div>
          <div>
              <br />
              <h2>foodItems List</h2>
            <div>
              <Link to="/add-nuevan"> // sholuld be createMeal
                + Add New Nuevan
              </Link>
              <br />
              <hr />
            </div>
          </div>
          <div>
                {menuItemsList}
          </div>
          <div>
            <button type="button">Order</button>
          </div>
          <Outlet />
      </div>
    );
  }
}

export default ShowAllfoodItems;
