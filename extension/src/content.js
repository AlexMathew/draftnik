import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";

const reactRoot = document.createElement("div");
reactRoot.classList = "draftnik-root";

ReactDOM.render(<App />, reactRoot);
