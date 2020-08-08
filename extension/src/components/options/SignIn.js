import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import { AUTH_TOKEN_FIELD } from "../../constants";
import { AuthFlow, styles } from "./AuthFlow";

class SignIn extends AuthFlow {
  componentDidMount() {
    const state = this.props.location.state;
    if (state) {
      if (state.success) {
        this.setState({
          error: { general: "You have created your new account." },
        });
      }
    }
  }

  headerText = "Sign In";
  submitUrl = "/auth/token/login/";
  buttonText = "Sign In";
  footerLink = "/signup";
  footerText = "Don't have an account? Sign Up";

  onSubmitSuccess = (input, response) => {
    const { username } = input;
    const { auth_token } = response.data;
    chrome.storage.local.set({
      [AUTH_TOKEN_FIELD]: { auth_token, username },
    });
    this.props.history.push("/");
  };
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignIn);
