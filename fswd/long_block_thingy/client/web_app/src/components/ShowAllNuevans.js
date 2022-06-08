import React, { Component } from 'react';
import axios from 'axios';
import { Outlet, Link } from 'react-router-dom';
import NuevanCard from './NuevanCard';

class ShowAllNuevans extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nuevans: []
    };
  }

  componentDidMount() {
    axios
      //TODO: fill in the GET call below with the appropriate URL
      //look at routes
      .get('')
      .then(res => {
        //TODO: Fill this in with the appropriate state information
        //from whatever the response is
        this.setState({

        })
      })
      .catch(err =>{
        console.log('Error from ShowAllNuevans');
      })
  };


  render() {
    //get our list from our state
    const nuevans = this.state.nuevans;
    let nuevansList;

    //determine what to render based on if our state is populated
    if(!nuevans) {
      nuevansList = "There are no people in the database yet";
    } else {
      //map our list from our state
      //see NuevanCard for how we are rendering the Card
      nuevansList = nuevans.map((nuevan, k) =>
        <NuevanCard nuevanInfo={nuevan} key={k} />
      );
    }

    return (
      <div>
          <div>
              <br />
              <h2>Nuevans List</h2>
            <div>
              <Link to="/add-nuevan">
                + Add New Nuevan
              </Link>
              <br />
              <hr />
            </div>
          </div>
          <div>
                {nuevansList}
          </div>
          <Outlet />
      </div>
    );
  }
}

export default ShowAllNuevans;
