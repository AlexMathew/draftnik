import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import { AuthFlow, styles } from "./AuthFlow";

class SignUp extends AuthFlow {
  headerText = "Sign Up";
  submitUrl = "/auth/users/";
  buttonText = "Sign Up";
  footerLink = "/signin";
  footerText = "Already have an account? Sign in";

  onSubmitSuccess = () => {
    this.props.history.push({
      pathname: "/signin",
      state: { success: true },
    });
  };
}

SignUp.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignUp);
