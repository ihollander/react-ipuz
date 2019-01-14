import React from "react";
import { connect } from "react-redux";

const renderWithAuth = Component => {
  class AuthorizedComponent extends React.Component {
    render() {
      return this.props.isSignedIn && <Component />;
    }
  }
  const mapStateToProps = ({ auth: { isSignedIn } }) => ({ isSignedIn });
  
  return connect(mapStateToProps)(AuthorizedComponent)
};

export default renderWithAuth