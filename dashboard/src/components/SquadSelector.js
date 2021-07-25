import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Hidden from "@material-ui/core/Hidden";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import GameweekPaginator from "./squadSelector/GameweekPaginator";
import DraftList from "./squadSelector/DraftList";
import CollectionList from "./collectionView/CollectionList";
import { connect } from "react-redux";
import {
  switchMobile,
  selectCollection,
  selectCollectionDraft,
} from "../actions";

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
  switcherButton: {
    display: "block",
    textAlign: "center",
  },
});

class SquadSelector extends React.Component {
  state = {
    gameweekView: true,
  };

  switcherClick = () => {
    const presentState = this.state.gameweekView;
    this.setState({ gameweekView: !presentState });
    this.props.selectCollection(null);
    this.props.selectCollectionDraft(null);
  };

  render() {
    const { classes } = this.props;
    const gameweekView = (
      <>
        <GameweekPaginator />
        <Divider />
        <DraftList />
      </>
    );
    const collectionView = <CollectionList />;

    const drawer = (
      <div>
        <div className={classes.toolbar} />
        {/* <Divider />
        <div className={classes.switcherButton}>
          <Button onClick={this.switcherClick}>{`Switch to ${
            this.state.gameweekView ? "collection" : "gameweek"
          } view`}</Button>
        </div> */}
        <Divider />
        {this.state.gameweekView ? gameweekView : collectionView}
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

const wrappedSquadSelector = connect(mapStateToProps, {
  switchMobile,
  selectCollection,
  selectCollectionDraft,
})(SquadSelector);
export default withStyles(styles)(wrappedSquadSelector);
