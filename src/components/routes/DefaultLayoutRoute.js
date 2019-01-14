import React from "react";
import { Route } from "react-router-dom";
import DefaultLayout from "../layouts/DefaultLayout";

const DefaultLayoutRoute = ({
  component: Component,
  ...rest
}) => {
  const renderLayout = props => {
    return (
      <DefaultLayout>
        <Component {...props} />
      </DefaultLayout>
    );
  };

  return <Route {...rest} render={renderLayout} />;
};

export default DefaultLayoutRoute;
