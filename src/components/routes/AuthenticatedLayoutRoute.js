import React from "react";
import { Route, Redirect } from "react-router-dom";
import AuthenticatedLayout from "../layouts/AuthenticatedLayout";

const AuthenticatedLayoutRoute = ({
  isAuthenticated,
  component: Component,
  ...rest
}) => {
  
  const renderLayout = props => {
    return isAuthenticated ? (
      <AuthenticatedLayout>
        <Component {...props} />
      </AuthenticatedLayout>
    ) : (
      <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
    );
  };

  return <Route {...rest} render={renderLayout} />;
};

export default AuthenticatedLayoutRoute;
