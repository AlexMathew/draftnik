import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { connect } from "react-redux";
import SquadDisplay from "./SquadDisplay";

const styles = () => ({
  pitch: {
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    height: "85vh",
  },
});

class Pitch extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <Container maxWidth="lg">
        <div
          className={classes.pitch}
          style={{
            backgroundImage: `url("/pitch.jpg")`,
          }}
        >
          <SquadDisplay />
        </div>
      </Container>
    );
  }
}

Pitch.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    selectedDraft: state.selected.draft,
  };
};

const wrappedPitch = connect(mapStateToProps)(Pitch);
export default withStyles(styles)(wrappedPitch);
