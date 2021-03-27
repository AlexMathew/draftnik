import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import { connect } from "react-redux";
import CollectionItem from "./CollectionItem";

const styles = () => ({});

class CollectionList extends React.Component {
  render() {
    const { classes, collections } = this.props;

    return (
      <List>
        {Object.keys(collections).map((id) => (
          <CollectionItem key={id} collection={collections[id]} />
        ))}
      </List>
    );
  }
}

CollectionList.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    collections: state.collections,
  };
};

const wrappedCollectionList = connect(mapStateToProps, {})(CollectionList);
export default withStyles(styles)(wrappedCollectionList);
