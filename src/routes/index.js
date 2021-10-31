import React from 'react';
import {Switch, Route} from 'react-router-dom';

//components
import Dashboard from './Dashboard/dashboard';
import Home from './Home/home';
const Routes = () => {
      return(
        <Switch>
          <Route path="/" exact="true">
               <Home/>
          </Route>
           <Route path="/dashboard">
              <Dashboard/>
           </Route>
            <Route></Route>
        </Switch>
      )
}
export default Routes