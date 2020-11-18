import { Avatar, Button, Container, CssBaseline, FormHelperText, Grid, makeStyles, TextField, Typography } from "@material-ui/core";
import { LockOutlined } from '@material-ui/icons';
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import { authAPI } from "./authAPI";

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
    marginTop: theme.spacing(3),
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

//template from // template from https://github.com/mui-org/material-ui/blob/master/docs/src/pages/getting-started/templates/sign-up
const SignUp: React.FC<{}> = ({ }) => {
  const classes = useStyles();
  const history = useHistory();
  const { handleSubmit, register, errors } = useForm();
  const [serverError, setServerError] = useState(null);
  const onSignUp = (userData: { email: string, password: string, name: string }) => {
    const { email, password, name } = userData;
    async function signUp() {
      try {
        const response = await authAPI.signUp({ email, password, name });
        history.push('/login');
      } catch (e) {
        const { message = 'Error' } = e;
        // console.log({ message });
        setServerError((prev) => message);
      }
    }
    signUp();
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form onSubmit={handleSubmit(onSignUp)} className={classes.form} noValidate>
          <Grid container spacing={2}>
            {serverError &&
              <FormHelperText error variant='filled' margin='dense'>
                <Typography variant='body1'>{serverError}</Typography>
              </FormHelperText>
            }
            <Grid item xs={12}>
              <TextField
                inputRef={register}
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                type='email'
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                inputRef={register}
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                inputRef={register}
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
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
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item className={classes.link}>
              <Typography variant='body2' noWrap>
                <Link to='/login'>
                  Already have an account? Log in
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

export default SignUp;