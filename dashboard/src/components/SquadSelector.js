import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { connect } from "react-redux";
import { selectDraft } from "../actions";

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
        <List>
          {this.props.drafts.map((draft, index) => (
            <ListItem
              button
              key={index}
              onClick={() => this.props.selectDraft(index)}
            >
              <ListItemText primary={draft.name} />
            </ListItem>
          ))}
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
    drafts: state.drafts.drafts,
  };
};

const wrappedSquadSelector = connect(mapStateToProps, { selectDraft })(
  SquadSelector
);
export default withStyles(styles)(wrappedSquadSelector);
