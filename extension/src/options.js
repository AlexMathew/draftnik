import React from "react";
import ReactDOM from "react-dom";
// import { Provider } from "react-redux";
// import { Store } from "webext-redux";
import Options from "./components/Options";
// import { STORE_PORT_NAME } from "./constants";

// const store = new Store({ portName: STORE_PORT_NAME });

// store.ready().then(() => {
//   ReactDOM.render(
//     <Provider store={store}>
//       <Options />
//     </Provider>,
//     document.querySelector("#root")
//   );
// });
ReactDOM.render(<Options />, document.querySelector("#root"));
