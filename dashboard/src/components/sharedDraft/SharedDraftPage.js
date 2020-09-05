import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import PublicHeader from "./PublicHeader";

const styles = () => ({
  root: {
    display: "flex",
  },
});

class SharedDraftPage extends React.Component {
  render() {
    const { classes, ...otherProps } = this.props;
    const { body, drafts, selectedGameweek, selectedDraft } = otherProps;
    const draft =
      selectedDraft !== null ? drafts[selectedGameweek][selectedDraft] : null;

    return (
      <div className={classes.root}>
        {draft ? (
          <Helmet>
            <title>{`View ${draft ? `${draft.user}'s` : ""} "${
              draft ? draft.name : ""
            }" draft - Draftnik`}</title>
          </Helmet>
        ) : null}
        <CssBaseline />
        <PublicHeader {...otherProps} />
        {body}
      </div>
    );
  }
}

SharedDraftPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    drafts: state.drafts,
    selectedGameweek: state.selected.gameweek,
    selectedDraft: state.selected.draft,
  };
};

const wrappedSharedDraftPage = connect(mapStateToProps)(SharedDraftPage);
export default withStyles(styles)(wrappedSharedDraftPage);
