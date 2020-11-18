import { Avatar, Button, Container, CssBaseline, Grid, makeStyles, TextField, Typography } from "@material-ui/core";
import { LockOutlined } from '@material-ui/icons';
import React from "react";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  link: {
    '& a': {
      textDecoration: 'none',
      color: 'inherit'
    }
  }
}));

// template from https://github.com/mui-org/material-ui/blob/master/docs/src/pages/getting-started/templates/sign-in/
export default function Login() {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
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
            {/* <Grid item xs>
              <Link href="/forgetPassword" variant="body2">
                Forgot password?
              </Link>
            </Grid> */}
            <Grid item className={classes.link}>
              <Typography variant='body2' noWrap>
                <Link to='/signUp'>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}