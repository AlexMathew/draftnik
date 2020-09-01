import React from "react";
import CtaButton from "./CtaButton";

class CloneDraft extends React.Component {
  handleClick = () => {
    const { draftCode } = this.props;
    console.log(draftCode);
  };

  render() {
    return <CtaButton handleClick={this.handleClick} content="Clone Draft" />;
  }
}

export default CloneDraft;
