import React from 'react';
import { Switch, Route } from 'react-router-dom';

//components
import Home from './home/home';
import Counsellor from './counsellor/counsellor'
import Login from './login/login'
import Register from './register/register'
import User from './user/user'

const Routes = () => {
    return (
        <Switch>
            <Route path="/" exact>
                <Home />
            </Route>
            <Route path="/users/:id">
                <User />
            </Route>
            {/**<Route path="/counsellors/:id">
                <Counsellor/>
      </Route>**/}
            <Route path="/login">
                <Login />
            </Route>
            <Route path="/register">
                <Register />
            </Route>
        </Switch>
    )
}
export default Routes