import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import history from "../../history";
import { AUTH_TOKEN_FIELD } from "../../constants";
import { AuthFlow, styles } from "./AuthFlow";

class SignIn extends AuthFlow {
  componentDidMount() {
    const authToken = localStorage.getItem(AUTH_TOKEN_FIELD);
    if (authToken) {
      history.push("/");
    }

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

  onSubmitSuccess = (response) => {
    const { auth_token } = response.data;
    localStorage.setItem(AUTH_TOKEN_FIELD, auth_token);
    this.props.history.push("/");
  };
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignIn);
