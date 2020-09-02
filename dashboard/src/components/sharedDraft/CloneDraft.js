import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import CtaButton from "./CtaButton";
import InfoModal from "./InfoModal";
import CopyIcon from "../utils/CopyIcon";
import draftnik from "../../api/draftnik";
import history from "../../history";
import { AUTH_TOKEN_FIELD } from "../../constants";

const styles = (theme) => ({
  icon: {
    marginRight: theme.spacing(1),
  },
});

class CloneDraft extends React.Component {
  state = {
    info: {
      open: false,
      title: "",
      content: "",
      cta: "",
      handleContinue: () => {},
    },
  };

  handleClose = () => {
    this.setState({
      info: {
        open: false,
        title: "",
        content: "",
        cta: "",
        handleContinue: () => {},
      },
    });
  };

  handleClick = () => {
    const { draftCode } = this.props;
    const authToken = localStorage.getItem(AUTH_TOKEN_FIELD);
    draftnik
      .post(
        "/draft/clone/",
        {
          draft_code: draftCode,
        },
        {
          headers: {
            Authorization: `Token ${authToken}`,
          },
        }
      )
      .then(() => {
        this.setState({
          info: {
            open: true,
            title: "Success!",
            content: "You can now return to your dashboard.",
            cta: "Continue",
            handleContinue: () => {
              history.push("/");
            },
          },
        });
      })
      .catch((err) => {
        if (err.response.status === 401) {
          this.setState({
            info: {
              open: true,
              title: "Not authenticated!",
              content: "You need to be signed in to clone this draft.",
              cta: "Sign in",
              handleContinue: () => {
                history.push("/signin");
              },
            },
          });
        } else {
          this.setState({
            info: {
              open: true,
              title: "Failure!",
              content: "Sorry! We have encountered an error.",
              cta: "Continue",
              handleContinue: () => {},
            },
          });
        }
      });
  };

  render() {
    const { classes } = this.props;

    const content = (
      <>
        <CopyIcon className={classes.icon} />
        Clone Draft
      </>
    );

    return (
      <>
        <CtaButton handleClick={this.handleClick} content={content} />
        <InfoModal {...this.state.info} handleClose={this.handleClose} />
      </>
    );
  }
}

CloneDraft.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CloneDraft);
