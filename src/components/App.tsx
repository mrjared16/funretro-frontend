
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Board } from '../features/Board';

function App() {
  return (
    <Switch>
      <Route path='/boards'>
        <Board />
      </Route>
    </Switch>
  );
}

export default App;
