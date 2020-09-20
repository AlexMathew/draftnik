import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Fixture from "./Fixture";
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
    const { classes, fixtureDay, fixtures } = this.props;

    return (
      <>
        <div className={classes.header}>{getDateString(fixtureDay)}</div>
        <List>
          {fixtures.map((fixture, index) => (
            <ListItem className={classes.fixture} key={index} divider>
              <Fixture fixture={fixture} />
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

export default withStyles(styles)(FixturesDay);
