import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import GameweekPaginator from "./draftDrawer/GameweekPaginator";
import DraftList from "./draftDrawer/DraftList";

const drawerWidth = 350;

const styles = (theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
});

class SquadSelector extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div className={classes.toolbar} />
        <Divider />
        <GameweekPaginator />
        <Divider />
        <DraftList />
      </Drawer>
    );
  }
}

SquadSelector.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SquadSelector);
