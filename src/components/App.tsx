
import { AppBar } from '@material-ui/core';
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Board } from '../features/Board';
import Login from '../features/Board/Auth/Login';
import SignUp from '../features/Board/Auth/SignUp';
import PrivateRoute from './PrivateRoute';

function App() {
  return (
    <>
      <Switch>
        <PrivateRoute path='/boards'>
          <Board />
        </PrivateRoute>
        <Route path='/login'>
          <Login />
        </Route>
        <Route path='/signUp'>
          <SignUp />
        </Route>

        <Redirect to='/boards' />
      </Switch>
    </>
  );
}

export default App;
