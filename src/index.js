import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ActionCableProvider } from "react-actioncable-provider";

import store from "./store";
import App from "./components/App";

ReactDOM.render(
  <ActionCableProvider url={`${process.env.REACT_APP_API_WS_ROOT}/cable`}>
    <Provider store={store}>
      <App />
    </Provider>
  </ActionCableProvider>,
  document.getElementById("root")
);
