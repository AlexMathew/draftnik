import React from "react";
import { connect } from "react-redux";

class Popup extends React.Component {
  render() {
    return <div>{this.props.count}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    count: state.test,
  };
};

export default connect(mapStateToProps)(Popup);
