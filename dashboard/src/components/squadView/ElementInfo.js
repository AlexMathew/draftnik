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
  DOUBTFUL_75 = "75%";
  DOUBTFUL_50 = "50%";
  DOUBTFUL_25 = "25%";

  playerStatusColor = () => {
    const { element } = this.props;
    if (element.status === AVAILABILITY.AVAILABLE) return "white";
    else if (element.status === AVAILABILITY.DOUBTFUL) {
      if (element.news.includes(this.DOUBTFUL_25)) {
        return "rgb(212, 68, 1)";
      } else if (element.news.includes(this.DOUBTFUL_50)) {
        return "rgb(255, 171, 27)";
      } else {
        return "rgb(233, 255, 3)";
      }
    } else {
      return "rgb(192, 2, 13)";
    }
  };

  render() {
    const { classes, element } = this.props;

    if (element.status === AVAILABILITY.AVAILABLE) return null;

    const statusColor = this.playerStatusColor();
    return (
      <Tooltip
        classes={{ tooltipArrow: classes.tooltip }}
        title={element.news}
        arrow
        interactive
        placement="top-start"
      >
        <InfoIcon htmlColor={statusColor} />
      </Tooltip>
    );
  }
}

ElementInfo.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ElementInfo);
