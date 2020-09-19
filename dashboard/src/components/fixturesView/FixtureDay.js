import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { connect } from "react-redux";
import { getDateString } from "../../utils/datetime";

const styles = (theme) => ({
  header: {
    background: "lightgrey",
    fontWeight: "bold",
    textAlign: "center",
  },
  fixture: {
    textAlign: "center",
  },
});

class FixturesDay extends React.Component {
  render() {
    const { classes, teams, fixtureDay, fixtures } = this.props;

    return (
      <>
        <div className={classes.header}>{getDateString(fixtureDay)}</div>
        <List>
          {fixtures.map((fixture, index) => (
            <ListItem className={classes.fixture} key={index} divider>
              <ListItemText>{`${teams[fixture.home].short_name} vs ${
                teams[fixture.away].short_name
              }`}</ListItemText>
            </ListItem>
          ))}
        </List>
      </>
    );
  }
}

FixturesDay.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    teams: state.teams,
  };
};

const wrappedFixturesDay = connect(mapStateToProps)(FixturesDay);
export default withStyles(styles)(wrappedFixturesDay);
