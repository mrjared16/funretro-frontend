
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Board } from '../features/Board';

function App() {
  return (
    <Switch>
      <Route path='/boards'>
        <Board />
      </Route>
      <Redirect to='/boards' />
    </Switch>
  );
}

export default App;
