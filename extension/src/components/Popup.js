import React from "react";
import { connect } from "react-redux";
import { fetchStaticData } from "../actions";

class Popup extends React.Component {
  componentDidMount() {
    this.props.fetchStaticData();
  }

  render() {
    return <div>{this.props.count}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    count: state.test,
  };
};

export default connect(mapStateToProps, { fetchStaticData })(Popup);
