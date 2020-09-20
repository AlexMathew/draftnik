import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Badge from "@material-ui/core/Badge";
import { connect } from "react-redux";
import { ELEMENT_TYPES } from "../../constants";
import ElementInfo from "./ElementInfo";
import PitchElementFixtures from "./PitchElementFixtures";

const styles = (theme) => ({
  element: {
    width: "15%",
  },
  jerseyContainer: {
    textAlign: "center",
  },
  jersey: {
    [theme.breakpoints.down("md")]: {
      height: "5vh",
    },
    height: "8vh",
  },
  name: {
    [theme.breakpoints.down("md")]: {
      fontSize: "x-small",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "xx-small",
    },
    fontSize: "small",
    fontWeight: "bold",
    textAlign: "center",
    background: "darkgreen",
    color: "white",
  },
  price: {
    [theme.breakpoints.down("md")]: {
      fontSize: "x-small",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "xx-small",
    },
    fontSize: "small",
    fontWeight: "bold",
    textAlign: "center",
    background: "palegreen",
  },
});

class PitchElement extends React.Component {
  jerseyUrl = (element) => {
    const isGk = element.element_type === ELEMENT_TYPES.GOALKEEPERS;
    return `/jerseys/${isGk ? "gk" : "out"}/${element.team}.png`;
  };

  playerCost = (element) => {
    return `${(element.now_cost / 10).toString()}${
      element.now_cost % 10 === 0 ? ".0" : ""
    }`;
  };

  render() {
    const { classes, element, teams } = this.props;
    const team = teams[element.team];

    return (
      <Grid className={classes.element}>
        <Grid item className={classes.jerseyContainer}>
          <Badge
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            badgeContent={<ElementInfo element={element} />}
          >
            <img
              className={classes.jersey}
              src={this.jerseyUrl(element)}
              alt={team.name}
            />
          </Badge>
        </Grid>
        <Grid item xs>
          <Typography className={classes.name}>
            {element.web_name} ({team.short_name})
          </Typography>
          <Typography className={classes.price}>
            {this.playerCost(element)}
          </Typography>
          <PitchElementFixtures element={element} />
        </Grid>
      </Grid>
    );
  }
}

PitchElement.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    teams: state.teams,
  };
};

const wrappedPitchElement = connect(mapStateToProps)(PitchElement);
export default withStyles(styles)(wrappedPitchElement);
