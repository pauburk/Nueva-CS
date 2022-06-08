import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

class AddNuevan extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email:'',
      role:'',
      grade:'',
      submitted: null,
    };
  }

  onChange = e => {
    //the target.name will refer to the form name= section
    //in the html form below (in the render)
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    //this is akin to making our JSON object
    //on postman
    const data = {
      name: this.state.name,
      email: this.state.email,
      role: this.state.role,
      grade: this.state.grade,
    };

    //now we use axios to communicate with our backend
    axios
      .post('http://localhost:8082/create', data)
      .then(res => {
        //we clear our state and set submitted to true
        //in order to navigate back (see render)
        this.setState({
          name: '',
          email:'',
          role:'',
          grade:'',
          submitted: true,
        })
      })
      .catch(err => {
        console.log("Error in AddNuevan!");
        console.error(err);
      })
  };

  render() {
    let submitted = this.state.submitted;
    return (
      <div>
        {/* If submitted is true, also render <Navigate>
          which auto Navigates to the URL specified
          */
          submitted && (
          <Navigate to="/show" replace={true} />
        )}
        <h2>Add Book</h2>
        <p>Create new book</p>
        <form noValidate onSubmit={this.onSubmit}>
          <div>
            <input
              type='text'
              placeholder='Name of Nuevan'
              name='name'
              value={this.state.title}
              onChange={this.onChange}
            />
          </div>
          <br />
          <div>
            <input
              type='text'
              placeholder='Email of Nuevan'
              name='email'
              value={this.state.email}
              onChange={this.onChange}
            />
          </div>
          <br />
          <div>
            <input
              type='text'
              placeholder='Role of Nuevan'
              name='role'
              value={this.state.role}
              onChange={this.onChange}
            />
          </div>
          <br />
          <div>
            <input
              type='text'
              placeholder='Grade of Nuevan'
              name='grade'
              value={this.state.grade}
              onChange={this.onChange}
            />
          </div>
          <br />
          <button type = 'submit'>Click to submit</button>
        </form>
      </div>
    );
  }
}

export default AddNuevan;
