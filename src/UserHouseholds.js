import React, {Component} from 'react';
import {database, auth} from './firebase.js';

class UserHouseholds extends Component {
  constructor(){
    super();

    this.state = {
      name: "",
      tasks: []
    }
  }
  componentDidMount(){
    database.ref('/households_practice').on('value', (res) => {
      // this.props.history.push('/');
      // debugger
      this.setState({
        name: res.val().name,
        tasks: res.val().tasks
      })
    });
  }

  render() {
    return (
      <div>
        <div>{this.state.name}</div>
        {this.state.tasks.map( (task, i) => (
          <div key={i} onClick={() => database.ref('/households_practice/tasks/' + i + '/done').set((!task.status))}>
            <div>taskName: {task.name}</div>
            <div>taskName: {task.assignee}</div>
            <div>taskName: {task.status ? "done" : "not done"}</div>
          </div>
        ))}
      </div>
    );
  }
}

export default UserHouseholds;
