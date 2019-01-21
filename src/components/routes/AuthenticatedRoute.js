import React from "react";
import { Route, Redirect } from "react-router-dom";

const AuthenticatedRoute = ({
  isAuthenticated,
  component: Component,
  ...rest
}) => {
  const renderLayout = props => {
    return isAuthenticated ? (
      <Component {...props} />
    ) : (
      <Redirect to={{ pathname: "/", state: { from: props.location } }} />
    );
  };

  return <Route {...rest} render={renderLayout} />;
};

export default AuthenticatedRoute;
