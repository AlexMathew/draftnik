import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import { Link as RouterLink } from "react-router-dom";
import Copyright from "./Copyright";
import draftnik from "../../api/draftnik";
import history from "../../history";
import { AUTH_TOKEN_FIELD } from "../../constants";

export const styles = (theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: "url(/icons/logo512.png)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  signin: {
    display: "grid",
    placeItems: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  error: {
    fontSize: theme.spacing(2),
    color: red[500],
  },
});

class SignIn extends React.Component {
  state = {
    username: "",
    password: "",
    error: {
      general: "",
      username: "",
      password: "",
    },
  };

  componentDidMount() {
    const authToken = localStorage.getItem(AUTH_TOKEN_FIELD);
    if (authToken) {
      history.push("/");
    }
  }

  onSubmitSuccess = (response) => {
    const { auth_token } = response.data;
    localStorage.setItem(AUTH_TOKEN_FIELD, auth_token);
    this.props.history.push("/");
  };

  submit = (event) => {
    event.preventDefault();
    const { username, password } = this.state;
    const fields = ["username", "password"];

    draftnik
      .post("/auth/token/login/", {
        username,
        password,
      })
      .then((response) => {
        this.onSubmitSuccess(response);
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
      });
  };

  render() {
    const { classes } = this.props;
    const { error } = this.state;

    return (
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={6}
          square
          className={classes.signin}
        >
          <div className={classes.paper}>
            <Typography component="h1" variant="h4">
              Sign in
            </Typography>
            <Typography component="h4" variant="h6" className={classes.error}>
              {error.general || ""}
            </Typography>
            <form className={classes.form} noValidate onSubmit={this.submit}>
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
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign In
              </Button>
              <Grid container justify="flex-end">
                <Grid item>
                  <RouterLink to={"/signup"}>
                    Don't have an account? Sign Up
                  </RouterLink>
                </Grid>
              </Grid>
              <Box mt={5}>
                <Copyright />
              </Box>
            </form>
          </div>
        </Grid>
      </Grid>
    );
  }
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignIn);
