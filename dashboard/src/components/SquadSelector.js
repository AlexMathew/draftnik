import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Hidden from "@material-ui/core/Hidden";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import GameweekPaginator from "./squadSelector/GameweekPaginator";
import DraftList from "./squadSelector/DraftList";
import { connect } from "react-redux";
import { switchMobile } from "../actions";

const styles = (theme) => ({
  drawer: {
    [theme.breakpoints.up("lg")]: {
      width: theme.spacing(37.5),
      flexShrink: 0,
    },
  },
  drawerPaper: {
    width: theme.spacing(40),
  },
  toolbar: theme.mixins.toolbar,
});

class SquadSelector extends React.Component {
  render() {
    const { classes } = this.props;
    const drawer = (
      <div>
        <div className={classes.toolbar} />
        <Divider />
        <GameweekPaginator />
        <Divider />
        <DraftList />
      </div>
    );

    return (
      <nav className={classes.drawer}>
        <Hidden lgUp implementation="js">
          <Drawer
            variant="temporary"
            open={this.props.mobileOpen}
            onClose={this.props.switchMobile}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true,
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden mdDown implementation="js">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    );
  }
}

SquadSelector.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    mobileOpen: state.responsive.mobileOpen,
  };
};

const wrappedSquadSelector = connect(mapStateToProps, { switchMobile })(
  SquadSelector
);
export default withStyles(styles)(wrappedSquadSelector);
