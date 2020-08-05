import React from "react";
import ReactDOM from "react-dom";
import ContentScript from "./components/ContentScript";

const reactRoot = document.createElement("div");
reactRoot.classList = "draftnik-root";

ReactDOM.render(<ContentScript />, reactRoot);
