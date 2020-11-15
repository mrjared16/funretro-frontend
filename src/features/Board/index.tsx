import { Box, Button, Container, Grid, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { Link, useRouteMatch } from 'react-router-dom';
import { boardAPI } from './boardAPI';

interface Props {

}

export const Board = (props: Props) => {
  let match = useRouteMatch();
  const [boards, setBoards] = useState<{ id: string, name: string }[]>([]);
  useEffect(() => {
    const getBoards = async () => {
      const response = await boardAPI.getAllBoards();
      const boards: { id: string, name: string }[] = response;
      setBoards((prev) => boards);
    }
    getBoards();
  }, [])
  const handleAddBoard = () => {

  }
  return (
    <Container>
      <Box>
        <Typography>My boards</Typography>
      </Box>
      <Box>
        <Grid container spacing={3}>
          <Grid item xs>
            <Button onClick={() => handleAddBoard()}>Add new board</Button>
          </Grid>
          {
            boards.map((board) =>
              (
                <Grid item xs>
                  <Box>
                    <Link to={`${match.url}/${board.id}`} >
                      <Typography>{board.name}</Typography>
                    </Link>
                  </Box>
                </Grid>
              ))
          }
        </Grid>
      </Box>
    </Container>
  )
}
