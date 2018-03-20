import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom'
import UserList from "./components/UserList";
import UserForm from "./components/Form";
import UserDetail from "./components/UserDetail";




class User extends Component {

    render() {
        return (
            <div>
                <h2>User</h2>
                <section className="content">

                    <Switch>
                        <Route exact path="/user" component={UserList}/>
                        <Route exact path="/user/create" component={UserForm}/>
                        <Route exact path="/user/:id/edit" component={UserForm}/>
                        <Route exact path="/user/:id" component={UserDetail}/>
                    </Switch>

                </section>
            </div>
        );
    }
}

export default User;