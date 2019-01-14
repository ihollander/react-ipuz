import React from "react";
import { Route, Redirect } from "react-router-dom";
import DefaultLayout from "../layouts/DefaultLayout";

const AuthenticatedLayoutRoute = ({
  isAuthenticated,
  component: Component,
  ...rest
}) => {
  const renderLayout = props => {
    return isAuthenticated ? (
      <DefaultLayout>
        <Component {...props} />
      </DefaultLayout>
    ) : (
      <Redirect
        to={{ pathname: "/puzzles", state: { from: props.location } }}
      />
    );
  };

  return <Route {...rest} render={renderLayout} />;
};

export default AuthenticatedLayoutRoute;
