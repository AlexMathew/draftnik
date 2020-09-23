import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import SharedDraftPage from "./sharedDraft/SharedDraftPage";
import SquadView from "./SquadView";
import FixturesView from "./FixturesView";
import { connect } from "react-redux";
import { fetchSharedDraftDetails } from "../actions";

const styles = (theme) => ({
  root: {
    [theme.breakpoints.up("sm")]: {
      display: "flex",
      flexGrow: 1,
    },
    display: "grid",
  },
});

class SharedDraft extends React.Component {
  componentDidMount() {
    const { draftCode } = this.props.match.params;
    this.props.fetchSharedDraftDetails(draftCode);
  }

  render() {
    const { classes } = this.props;
    const { draftCode } = this.props.match.params;

    const body = (
      <div className={classes.root}>
        <CssBaseline />
        <SquadView showUsername={true} />
        <FixturesView />
      </div>
    );

    return <SharedDraftPage body={body} draftCode={draftCode} found />;
  }
}

SharedDraft.propTypes = {
  classes: PropTypes.object.isRequired,
};

const wrappedSharedDraft = connect(null, { fetchSharedDraftDetails })(
  SharedDraft
);
export default withStyles(styles)(wrappedSharedDraft);
