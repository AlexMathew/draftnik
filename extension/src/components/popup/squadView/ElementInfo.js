import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import InfoIcon from "@material-ui/icons/Info";
import Tooltip from "@material-ui/core/Tooltip";
import { AVAILABILITY } from "../../../constants";

const styles = (theme) => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: "small",
  },
  info: {
    borderRadius: "50%",
    fontSize: "large",
    marginRight: theme.spacing(1),
  },
  available: {
    fill: "white",
    background: "black",
  },
  unavailable: {
    fill: "rgb(192, 2, 13)",
    background: "white",
  },
  doubtful25: {
    fill: "rgb(212, 68, 1)",
    background: "white",
  },
  doubtful50: {
    fill: "rgb(255, 171, 27)",
    background: "black",
  },
  doubtful75: {
    fill: "rgb(233, 255, 3)",
    background: "black",
  },
});

class ElementInfo extends React.Component {
  state = {
    tooltipOpen: false,
  };

  DOUBTFUL_75 = "75%";
  DOUBTFUL_50 = "50%";
  DOUBTFUL_25 = "25%";

  handleTooltipOpen = () => {
    this.setState({ tooltipOpen: true });
  };

  handleTooltipClose = () => {
    this.setState({ tooltipOpen: false });
  };

  playerStatusClass = () => {
    const { player } = this.props;
    if (player.status === AVAILABILITY.AVAILABLE) return "available";
    else if (player.status === AVAILABILITY.DOUBTFUL) {
      if (player.news.includes(this.DOUBTFUL_25)) {
        return "doubtful25";
      } else if (player.news.includes(this.DOUBTFUL_50)) {
        return "doubtful50";
      } else {
        return "doubtful75";
      }
    } else {
      return "unavailable";
    }
  };

  render() {
    const { classes, player } = this.props;

    return (
      <Tooltip
        classes={{ tooltipArrow: classes.tooltip }}
        title={player.news}
        arrow
        interactive
        placement="top-start"
      >
        <InfoIcon
          className={classes.info}
          classes={{
            root: classes[this.playerStatusClass()],
          }}
        />
      </Tooltip>
    );
  }
}

ElementInfo.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ElementInfo);
