import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import ArrowLeftIcon from "@material-ui/icons/ArrowLeft";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import { connect } from "react-redux";
import clsx from "clsx";
import { selectDraft, selectGameweek } from "../actions";

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
  paginator: {
    display: "flex",
    alignItems: "center",
    alignSelf: "center",
  },
  paginatorButton: {
    color: "black",
  },
  paginatorButtonDisabled: {
    color: "lightgray",
  },
});

class SquadSelector extends React.Component {
  render() {
    const {
      classes,
      gameweeks,
      drafts,
      selectedGameweek,
      selectGameweek,
      selectDraft,
    } = this.props;
    const gameweekKeys = Object.keys(gameweeks);

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
        <div className={classes.paginator}>
          <IconButton
            className={classes.paginatorButton}
            disabled={selectedGameweek === gameweekKeys[0]}
            classes={{
              root: clsx({
                [classes.paginatorButtonDisabled]:
                  selectedGameweek === gameweekKeys[0],
              }),
            }}
            onClick={() => {
              selectGameweek(parseInt(selectedGameweek) - 1);
              selectDraft(null);
            }}
          >
            <ArrowLeftIcon style={{ fontSize: 60 }} />
          </IconButton>
          <Typography variant="h5">
            {selectedGameweek in gameweeks
              ? gameweeks[selectedGameweek].name
              : ""}
          </Typography>
          <IconButton
            className={classes.paginatorButton}
            disabled={selectedGameweek === gameweekKeys.slice(-1)[0]}
            classes={{
              root: clsx({
                [classes.paginatorButtonDisabled]:
                  selectedGameweek === gameweekKeys.slice(-1)[0],
              }),
            }}
            onClick={() => {
              selectGameweek(parseInt(selectedGameweek) + 1);
              selectDraft(null);
            }}
          >
            <ArrowRightIcon style={{ fontSize: 60 }} />
          </IconButton>
        </div>
        <Divider />
        <List>
          {selectedGameweek in drafts
            ? drafts[selectedGameweek].map((draft, index) => (
                <ListItem button key={index} onClick={() => selectDraft(index)}>
                  <ListItemText primary={draft.name} />
                </ListItem>
              ))
            : ""}
        </List>
      </Drawer>
    );
  }
}

SquadSelector.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    gameweeks: state.gameweeks,
    selectedGameweek: state.selected.gameweek,
    drafts: state.drafts,
  };
};

const wrappedSquadSelector = connect(mapStateToProps, {
  selectDraft,
  selectGameweek,
})(SquadSelector);
export default withStyles(styles)(wrappedSquadSelector);
