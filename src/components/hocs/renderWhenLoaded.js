import React from "react";
// import { Segment, Dimmer } from "semantic-ui-react";

// const Loader = () => (
//   <Segment style={{height: "400px"}}>
//     <Dimmer active>
//       <Loader>Loading</Loader>
//     </Dimmer>
//   </Segment>
// );

const Loader = () => <div>Loading...</div>

const renderWhenLoaded = Component => props =>
  props.loaded ? <Component {...props} /> : <Loader />;

export default renderWhenLoaded;
