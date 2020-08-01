import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { connect } from "react-redux";
import SquadDisplay from "./SquadDisplay";

const styles = (theme) => ({
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    paddingTop: theme.spacing(3),
  },
  pitch: {
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    height: "85vh",
    // width: "100%",
  },
});

class SquadView extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Container maxWidth="lg">
          <div
            className={classes.pitch}
            style={{
              backgroundImage: `url("pitch.jpg")`,
            }}
          >
            {this.props.selectedDraft !== null ? <SquadDisplay /> : ""}
          </div>
        </Container>
      </main>
    );
  }
}

SquadView.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    selectedDraft: state.selected.draft,
  };
};

const wrappedSquadView = connect(mapStateToProps)(SquadView);
export default withStyles(styles)(wrappedSquadView);
