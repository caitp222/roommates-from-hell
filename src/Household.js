import React, {Component} from 'react';
import {database} from './firebase.js';

class Household extends Component {
    constructor(props){
      super(props);

      this.state = {
        householdName: '',
        householdAddress: ''
      }
    }

    submitHandler = (e) => {
      e.preventDefault();
      console.log(this)
      debugger

      const newHousehold = {
        name: this.state.name,
        address: this.state.address,
        user_id: 1
      }

      database.ref('/households').push(newHousehold).then( (res) => {
        this.props.history.push('/');
      });
    }

    render() {
        return (
          <div className="container">
            <h3 className="center-align">Create a new household</h3>
            <div className="row">
              <form className="col s12" onSubmit={this.submitHandler}>
                <div className="row">
                  <div className="input-field col s6 offset-s3">
                    <input id="icon_prefix" type="text" onChange={(e) => this.setState({name: e.target.value})}/>
                    <label htmlFor="icon_prefix">Name</label>
                  </div>
                  <div className="input-field col s6 offset-s3">
                    <input id="icon_telephone" type="text" onChange={(e) => this.setState({address: e.target.value})}/>
                    <label htmlFor="icon_telephone">Address</label>
                  </div>
                </div>
                <button className="btn waves-effect waves-light col s4 offset-s4" type="submit" name="action">Submit
                </button>
              </form>
            </div>
          </div>
        );
    }
}

export default Household;
