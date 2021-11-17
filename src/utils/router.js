import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { MyContext } from "../App";
import { useSigninCheck } from "reactfire";
import LoadingSpinner from "../routes/components/loadingSpinner";

/**
 * Checks if authentication is valid: If authentication is true, the children elements are rendered.
 * Or else the user is redirected to sigin path.
 * @param {*} children - JSX child element(s) that will be rendered if condition passes
 * @param { Object } rest - Props and other stuff
 */
export const ProtectedRoute = ({ children, ...rest }) => {

  const { status, data: signInCheckResult } = useSigninCheck();

  return (
    <Route
      {...rest}
      render={() => {
        console.log(status); // For debugging purposes
        if (status === "loading") return <LoadingSpinner/>;
        console.log(signInCheckResult.signedIn); //for debugging purposes
        return signInCheckResult.signedIn ? children : <Redirect to="/login" />;
      }}
    />
  );
};

/**
 * Checks if authentication is valid: If authentication is true, User is redirected to dashboard.
 * @param {*} children - JSX child element(s) that will be rendered if condition passes
 * @param { Object } rest - Props and other stuff
 */
export const AuthenticatedRedirect = ({ children, ...rest }) => {
  const { status, data: signInCheckResult } = useSigninCheck();
  return (
    <Route
      {...rest}
      render={() => {
        console.log(status); // For debugging purposes
        if (status === "loading") return  <LoadingSpinner/>;
        console.log(signInCheckResult.signedIn); // for debugging purposes...
        return signInCheckResult.signedIn ? <Redirect to="/user" /> : children;
      }}
    />
  );
};
