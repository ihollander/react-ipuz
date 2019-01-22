import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const AuthenticatedRoute = ({ isSignedIn, component: Component, ...rest }) => {
  const renderLayout = rest => {
    return isSignedIn ? (
      <Component {...rest} />
    ) : (
      <Redirect to={{ pathname: "/", state: { from: rest.location } }} />
    );
  };

  return <Route {...rest} render={renderLayout} />;
};

const mapStateToProps = ({ auth: { isSignedIn } }) => ({ isSignedIn });

export default connect(mapStateToProps)(AuthenticatedRoute);
