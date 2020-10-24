import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Store, applyMiddleware } from "webext-redux";
import thunk from "redux-thunk";
import ContentScript from "./components/ContentScript";
import { STORE_PORT_NAME } from "./constants";

const reactRoot = document.createElement("div");
reactRoot.classList = "draftnik-root";

const store = new Store({ state: {}, portName: STORE_PORT_NAME });
const middleware = [thunk];
const storeWithMiddleware = applyMiddleware(store, ...middleware);

storeWithMiddleware.ready().then(() => {
  ReactDOM.render(
    <Provider store={storeWithMiddleware}>
      <ContentScript />
    </Provider>,
    reactRoot
  );
});
