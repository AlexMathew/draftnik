import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";
import { red } from "@material-ui/core/colors";
import { Link as RouterLink } from "react-router-dom";
import Copyright from "./Copyright";
import draftnik from "../../api/draftnik";
import { AUTH_TOKEN_FIELD } from "../../constants";

export const styles = (theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    display: "grid",
    placeItems: "center",
  },
  error: {
    fontSize: theme.spacing(2),
    color: red[500],
  },
  submitSpinner: {
    color: "white",
    width: `${theme.spacing(3)}px !important`,
    height: `${theme.spacing(3)}px !important`,
  },
});

class SignUp extends React.Component {
  state = {
    username: "",
    password: "",
    error: {
      general: "",
      username: "",
      password: "",
    },
    submitting: false,
  };

  componentDidMount() {
    chrome.storage.local.get([AUTH_TOKEN_FIELD], (result) => {
      const token = result[[AUTH_TOKEN_FIELD]];
      if (token !== undefined && token.auth_token !== null) {
        this.props.history.push("/");
      }
    });
  }

  onSubmitSuccess = (username) => {
    this.props.history.push({
      pathname: "/signin",
      state: { success: true, username },
    });
  };

  submit = (event) => {
    event.preventDefault();
    this.setState({ submitting: true });
    const { username, password } = this.state;
    const fields = ["username", "password"];

    draftnik
      .post("/auth/users/", {
        username,
        password,
      })
      .then((response) => {
        this.onSubmitSuccess(username);
      })
      .catch((err) => {
        if (err.response) {
          const error = {};
          const data = err.response.data;
          error.general = data.non_field_errors;
          fields.forEach((field) => {
            error[[field]] = (data[[field]] || []).join(" ");
          });
          this.setState({ error });
        }
      })
      .finally(() => {
        this.setState({ submitting: false });
      });
  };

  render() {
    const { classes } = this.props;
    const { error } = this.state;

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar src="/icons/logo128.png" className={classes.avatar} />
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <Typography component="h4" variant="h6" className={classes.error}>
            {error.general || ""}
          </Typography>
          <form className={classes.form} noValidate onSubmit={this.submit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  autoFocus
                  onChange={(e) => {
                    this.setState({ username: e.target.value });
                  }}
                  error={error.username !== undefined && error.username !== ""}
                  helperText={error.username}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={(e) => {
                    this.setState({ password: e.target.value });
                  }}
                  error={error.password !== undefined && error.password !== ""}
                  helperText={error.password}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              {this.state.submitting ? (
                <CircularProgress
                  classes={{
                    root: classes.submitSpinner,
                  }}
                />
              ) : (
                "Sign Up"
              )}
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <RouterLink to={"/signin"}>
                  Already have an account? Sign in
                </RouterLink>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    );
  }
}

SignUp.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignUp);
