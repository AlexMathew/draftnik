import React from "react";
import PropTypes from "prop-types";
import { withStyles, withTheme } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import clsx from "clsx";
import { connect } from "react-redux";
import DraftActions from "../squadSelector/DraftActions";
import {
  selectDraftById,
  selectCollectionDraft,
  switchMobile,
} from "../../actions";

const styles = (theme) => ({
  draft: {
    paddingLeft: theme.spacing(2),
    display: "flex",
    flexGrow: 1,
  },
  selected: {
    background: "whitesmoke",
    color: "blue",
  },
  menu: {
    alignSelf: "center",
  },
});

class CollectionDraftItem extends React.Component {
  selectDraft = () => {
    const { draft, draftKey } = this.props;
    this.props.selectDraftById(draft.id);
    this.props.selectCollection();
    this.props.selectCollectionDraft(draftKey);
    const vw = Math.max(
      document.documentElement.clientWidth || 0,
      window.innerWidth || 0
    );
    if (vw < this.props.theme.breakpoints.values.lg) {
      this.props.switchMobile();
    }
  };

  isSelectedDraft = () => {
    return this.props.draftKey === this.props.selectedCollectionDraft;
  };

  render() {
    const { classes, draftById } = this.props;

    return (
      <div className={classes.draft}>
        <ListItem
          button
          onClick={this.selectDraft}
          classes={{
            root: clsx({
              [classes.selected]: this.isSelectedDraft(),
            }),
          }}
        >
          <ListItemText primary={draftById.name} />
          <ChevronRightIcon />
        </ListItem>
        <DraftActions className={classes.menu} draft={draftById} />
      </div>
    );
  }
}

CollectionDraftItem.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  return {
    selectedCollectionDraft: state.selected.collectionDraftKey,
    draftById: state.drafts.byId?.[ownProps.draft.id],
  };
};

const wrappedCollectionDraftItem = connect(mapStateToProps, {
  selectDraftById,
  selectCollectionDraft,
  switchMobile,
})(CollectionDraftItem);
export default withTheme(withStyles(styles)(wrappedCollectionDraftItem));
