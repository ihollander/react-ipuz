import React from "react";
import { Segment, Dimmer, Loader } from "semantic-ui-react";

const LoadingSpinner = () => (
  <Segment style={{height: "400px"}}>
    <Dimmer active>
      <Loader>Loading</Loader>
    </Dimmer>
  </Segment>
);

// const Loader = () => <div>Loading...</div>

const renderWhenLoaded = Component => props =>
  props.loaded ? <Component {...props} /> : <LoadingSpinner />;

export default renderWhenLoaded;
