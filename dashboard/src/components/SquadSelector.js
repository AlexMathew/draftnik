import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import Pagination from "@material-ui/lab/Pagination";
import { connect } from "react-redux";
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
        <Typography>
          {selectedGameweek in gameweeks
            ? gameweeks[selectedGameweek].name
            : ""}
        </Typography>
        <Pagination
          count={Object.keys(gameweeks).length}
          defaultPage={1}
          siblingCount={0}
          boundaryCount={1}
          onChange={(event, gw) => {
            event.preventDefault();
            selectGameweek(gw);
            selectDraft(null);
          }}
        />
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
