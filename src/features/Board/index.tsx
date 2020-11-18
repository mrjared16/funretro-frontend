import { AppBar, Box, Button, makeStyles, Toolbar, Typography } from '@material-ui/core';
import React from 'react';
import { Link, Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';
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
  const history = useHistory();
  const handleSignOut = () => {
    localStorage.removeItem('token');
    history.push('/')
  }
  return (
    <>
      <AppBar position='fixed'>
        <Toolbar className={classes.header}>
          <Box style={{ width: '100%' }} display='flex' >
            <Box flexGrow={1}>
              <Typography variant="h6" noWrap>
                <Link to='/'>
                  FunRetro Clone
                </Link>
              </Typography>
            </Box>
            <Box>
              <Button variant='outlined' color='inherit' onClick={() => handleSignOut()}>Sign out</Button>
            </Box>
          </Box>
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
