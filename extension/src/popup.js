import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Store, applyMiddleware } from "webext-redux";
import thunk from "redux-thunk";
import Popup from "./components/Popup";
import { STORE_PORT_NAME } from "./constants";

const store = new Store({ portName: STORE_PORT_NAME });
const middleware = [thunk];
const storeWithMiddleware = applyMiddleware(store, ...middleware);

storeWithMiddleware.ready().then(() => {
  ReactDOM.render(
    <Provider store={storeWithMiddleware}>
      <Popup />
    </Provider>,
    document.querySelector("#root")
  );
});
