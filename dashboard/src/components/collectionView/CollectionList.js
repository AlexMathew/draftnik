import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";

const styles = () => ({});

class CollectionList extends React.Component {
  render() {
    const { classes } = this.props;

    return <div>Collection list.</div>;
  }
}

CollectionList.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {};
};

const wrappedCollectionList = connect(mapStateToProps, {})(CollectionList);
export default withStyles(styles)(wrappedCollectionList);
