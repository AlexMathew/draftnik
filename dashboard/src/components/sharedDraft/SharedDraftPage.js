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
  draftDetails = () => {
    const { drafts, selectedGameweek, selectedDraft } = this.props;
    const draft =
      selectedDraft !== null ? drafts[selectedGameweek][selectedDraft] : null;

    return draft
      ? {
          title: `${draft.user}: ${draft.name} - Draftnik`,
          description: `View ${draft.user}'s "${draft.name}" draft on Draftnik`,
          url: draft.url,
          preview: draft.preview_url,
        }
      : {};
  };

  render() {
    const { classes, body, ...otherProps } = this.props;
    const draft = this.draftDetails();

    return (
      <div className={classes.root}>
        {draft ? (
          <Helmet>
            <title>{draft.title}</title>
            <meta name="description" content={draft.description} />
            <meta property="og:title" content={draft.title} />
            <meta property="og:description" content={draft.description} />
            {/* <meta property="og:image" content={draft.preview} /> */}
            <meta property="og:url" content={draft.url} />
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
