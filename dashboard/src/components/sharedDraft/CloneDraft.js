import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import CtaButton from "./CtaButton";
import CopyIcon from "../utils/CopyIcon";

const styles = (theme) => ({
  icon: {
    marginRight: theme.spacing(1),
  },
});

class CloneDraft extends React.Component {
  handleClick = () => {
    const { draftCode } = this.props;
    console.log(draftCode);
  };

  render() {
    const { classes } = this.props;

    const content = (
      <>
        <CopyIcon className={classes.icon} />
        Clone Draft
      </>
    );

    return <CtaButton handleClick={this.handleClick} content={content} />;
  }
}

CloneDraft.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CloneDraft);
