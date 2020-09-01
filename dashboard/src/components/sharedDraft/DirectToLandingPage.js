import React from "react";
import CtaButton from "./CtaButton";
import { LANDING_PAGE_URL } from "../../constants";

class DirectToLandingPage extends React.Component {
  handleClick = () => {
    var win = window.open(LANDING_PAGE_URL, "_blank");
    win.focus();
  };

  render() {
    return <CtaButton handleClick={this.handleClick} content="Try Draftnik" />;
  }
}

export default DirectToLandingPage;
