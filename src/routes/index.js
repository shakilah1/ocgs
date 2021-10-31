import React from 'react';
import {Switch, Route} from 'react-router-dom';

//components
import Home from './home/home';
import Counsellor from './counsellor/counsellor'
import User from './user/user'
import Login from './login/login'
import Register from './register/register'

const Routes = () => {
      return(
        <Switch>
          <Route path="/" exact="true">
               <Home/>
          </Route>
            <Route path="/counsellor">
                <Counsellor/>
            </Route>
             <Route path="/user">
                <User/>
            </Route>
             <Route path="/login">
                <Login/>
            </Route>
             <Route path="/register">
                <Register/>
            </Route>
        </Switch>
      )
}
export default Routes