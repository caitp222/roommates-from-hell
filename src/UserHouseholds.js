import React, {Component} from 'react';
import {database, auth} from './firebase.js';
import {Link} from 'react-router-dom';

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
        <Link to="/households/qwerty/chat">Chat</Link>
        {this.state.tasks.map( (task, i) => (
          <div key={i}>
            <div>taskName: {task.name}</div>
            <div>taskName: {task.assignee}</div>
            <div>taskName: {task.done ? "complete" : "not complete"}</div>
            <button onClick={() => database.ref('/households_practice/tasks/' + i + '/done').set((!task.status))}>mark complete</button>
          </div>
        ))}
      </div>
    );
  }
}

export default UserHouseholds;
