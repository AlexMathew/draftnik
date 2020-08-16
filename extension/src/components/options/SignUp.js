import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import { AUTH_TOKEN_FIELD } from "../../constants";
import { AuthFlow, styles } from "./AuthFlow";

class SignUp extends AuthFlow {
  componentDidMount() {
    chrome.storage.local.get([AUTH_TOKEN_FIELD], (result) => {
      const token = result[[AUTH_TOKEN_FIELD]];
      if (token !== undefined && token.auth_token !== null) {
        this.props.history.push("/");
      }
    });
  }

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
