import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import { connect } from "react-redux";
import {} from "../actions";

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
      </Drawer>
    );
  }
}

SquadSelector.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = () => {
  return {};
};

const wrappedSquadSelector = connect(mapStateToProps, {})(SquadSelector);
export default withStyles(styles)(wrappedSquadSelector);
