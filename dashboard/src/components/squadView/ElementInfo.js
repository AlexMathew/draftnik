import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import InfoIcon from "@material-ui/icons/Info";
import Tooltip from "@material-ui/core/Tooltip";
import { AVAILABILITY } from "../../constants";

const styles = (theme) => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
});

class ElementInfo extends React.Component {
  render() {
    const { classes, element } = this.props;

    if (element.status === AVAILABILITY.AVAILABLE) return null;

    return (
      <Tooltip
        classes={{ tooltipArrow: classes.tooltip }}
        title={element.news}
        arrow
        interactive
        placement="top-start"
      >
        <InfoIcon htmlColor="red" />
      </Tooltip>
    );
  }
}

ElementInfo.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ElementInfo);
