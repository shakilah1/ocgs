import React from 'react';
import { Switch } from 'react-router-dom';
import { ProtectedRoute, AuthenticatedRedirect} from "../utils/router"

//components
import Home from './home/home';
import Login from './login/login'
import Register from './register/register'
import User from './user/user'

const Routes = () => {
    return (
        <Switch>
            <AuthenticatedRedirect path="/" exact>
                <Home />
            </AuthenticatedRedirect>
            <ProtectedRoute path="/user">
                <User />
            </ProtectedRoute>
            <AuthenticatedRedirect path="/login">
                <Login />
            </AuthenticatedRedirect>
            <AuthenticatedRedirect path="/register">
                <Register />
            </AuthenticatedRedirect>
        </Switch>
    )
}
export default Routes