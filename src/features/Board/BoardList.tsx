import React, { useEffect, useState } from 'react'
import { AppBar, Box, Button, Card, CardActions, CardContent, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, makeStyles, TextField, Toolbar, Typography } from '@material-ui/core';
import { Link, useLocation, useRouteMatch } from 'react-router-dom';
import { boardAPI } from './boardAPI';
import { useForm } from 'react-hook-form';

interface Props {

}
const useStyles = makeStyles((theme) => ({
  title: {
    padding: '1em',
    '& *': {
      fontWeight: 'bold',
    }
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    '& a': {
      textDecoration: 'none'
    }
  },
  cardTitle: {
    height: '2em'
  },
  cardContent: {
    height: '4em'
  },
  addButtonDialog: {
    // width: '50%'
  }
}));


export const BoardList = (props: Props) => {
  const [openAddBoardDialog, setOpenAddButtonDialog] = React.useState(false);
  const [boards, setBoards] = useState<{ id: string, name: string }[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  let location = useLocation();

  useEffect(() => {
    const getBoards = async () => {
      const response = await boardAPI.getAllBoards();
      const boards: { id: string, name: string }[] = response;
      setBoards((prev) => boards);
      setIsLoading(false);
    }
    getBoards();
  }, [])

  const handleClickOpen = () => {
    setOpenAddButtonDialog(true);
  };

  const handleClose = () => {
    setOpenAddButtonDialog(false);
  };

  const { handleSubmit, register, errors } = useForm();
  const onAddBoard = (data: { name: string }) => {
    const { name = 'default' } = data;
    console.log({ name, data });
    boardAPI.addBoard({ name }).then(handleClose);
  }
  const onDeleteBoard = (id: string) => () => {
    console.log('delete board ' + id);
    boardAPI.deleteBoard(id);
  }
  const MyGrid: React.FC = ({ children }) => (
    <Grid item lg={2} md={3} sm={4} xs={6}>
      {children}
    </Grid>
  )

  const classes = useStyles();
  return (
    <>
      { isLoading
        ? 'Loading'
        : <Container className={classes.cardGrid}>
          <Box className={classes.title}>
            <Typography color='primary' variant='h2'>My boards</Typography>
          </Box>
          <Box>
            <Grid container spacing={3}>
              <MyGrid>
                <Button variant='contained' color='secondary' onClick={() => handleClickOpen()}>Add new board</Button>
              </MyGrid>
              {
                boards.map(({ id, name }) =>
                  (
                    <MyGrid key={id}>
                      <Card className={classes.card}>
                        <Link to={`${location.pathname}/${id}`} >
                          <CardContent className={classes.cardContent}>
                            <Typography color='textPrimary' variant='h6' className={classes.cardTitle}>{name}</Typography>
                          </CardContent>
                        </Link>
                        <CardActions>
                          <Button size="small" color='secondary'>Copy URL</Button>
                          <Button size="small" variant='outlined' onClick={onDeleteBoard(id)}>Delete</Button>
                        </CardActions>
                      </Card>
                    </MyGrid>
                  ))
              }
            </Grid>
          </Box>

          <Dialog fullWidth open={openAddBoardDialog} onClose={handleClose} aria-labelledby="form-dialog-title">
            <form
              onSubmit={handleSubmit(onAddBoard)}
              noValidate
            >
              <DialogTitle id="form-dialog-title">Add board</DialogTitle>
              <DialogContent className={classes.addButtonDialog}>
                {/* <DialogContentText>
            To subscribe to this website, please enter your email address here. We will send updates
            occasionally.
            </DialogContentText> */}
                <TextField
                  inputRef={register}
                  autoFocus
                  margin='dense'
                  id='name'
                  name='name'
                  label='Board name'
                  type='name'
                  fullWidth
                />
              </DialogContent>
              <DialogActions>
                <Button variant='contained' color='primary' type='submit'>Add board</Button>
                <Button variant='outlined' onClick={handleClose} color="primary"> Cancel </Button>
              </DialogActions>
            </form>
          </Dialog>
        </Container>
      }
    </>
  )
}
