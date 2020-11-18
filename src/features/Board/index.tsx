import { AppBar, makeStyles, Toolbar, Typography } from '@material-ui/core';
import React from 'react';
import { Link, Route, Switch, useRouteMatch } from 'react-router-dom';
import { BoardDetail } from './BoardDetail';
import { BoardList } from './BoardList';

interface Props {

}

const useStyle = makeStyles({
  header: {
    '& a': {
      textDecoration: 'none',
      color: 'inherit'
    }
  }
})

export const Board = (props: Props) => {
  const classes = useStyle();
  let match = useRouteMatch();
  return (
    <>
      <AppBar position='fixed'>
        <Toolbar className={classes.header}>
          <Typography variant="h6" noWrap>
            <Link to='/'>
              FunRetro Clone
          </Link>
          </Typography>
        </Toolbar>
      </AppBar>

      <main style={{ marginTop: '64px' /**64px is min height of AppBar */ }}>
        <Switch>
          <Route
            path={`${match.path}/:boardId`}
            render={
              (props) =>
                <BoardDetail id={props.match.params.boardId} />
            }
          />
          <Route exac path='/'>
            <BoardList />
          </Route>
        </Switch>
      </main>
    </>
  )
}
