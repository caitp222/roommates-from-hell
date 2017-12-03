import React, {Component} from 'react';
import {auth, database, googleAuthProvider} from './firebase';
import {BrowserRouter} from 'react-router-dom';
import pick from 'lodash/pick';



class App extends Component {
    constructor(props) {
        super(props);
        this.usersRef = null;
        this.userRef = null;

        this.state = {
            currentUser: null,
            users: {},
         
        };
    
    }

    componentDidMount() {
        auth.onAuthStateChanged((currentUser) => {
            this.setState({currentUser});
            this.usersRef = database.ref('/users');

            if (currentUser) {
                this.userRef = this.usersRef.child(currentUser.uid);

                this.userRef.once('value').then((snapshot) => {
                    if (snapshot.val())
                        return;
                    const userInfo = pick(currentUser, ['displayName', 'photoURL', 'email']);
                    this.userRef.set(userInfo);
                });
            }

            this.usersRef.on('value', (snapshot) => {
                this.setState({users: snapshot.val()});
            });
        });

    }

    toggleInstructions() {
        this.setState(prevState => ({
            showInstructions: !prevState.showInstructions
        }));
    }

    render() {
        return (
            <p>Hello</p>
        );
    }
}

export default App;
