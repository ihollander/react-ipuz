import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import {ActionCableProvider} from 'react-actioncable-provider'

const AuthenticatedRoute = ({ isSignedIn, component: Component, ...rest }) => {
  const renderLayout = rest => {
    const user = JSON.parse(localStorage.getItem('user'))
    return isSignedIn && user ? (
      <ActionCableProvider url={`${process.env.REACT_APP_API_WS_ROOT}/cable?access-token=${user.jwt}`}>
        <Component {...rest} />
      </ActionCableProvider>
    ) : (
      <Redirect to={{ pathname: "/", state: { from: rest.location } }} />
    );
  };

  return <Route {...rest} render={renderLayout} />;
};

const mapStateToProps = ({ auth: { isSignedIn } }) => ({ isSignedIn });

export default connect(mapStateToProps)(AuthenticatedRoute);
