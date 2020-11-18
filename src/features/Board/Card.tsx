import { Box, Button, makeStyles, TextField, Typography } from '@material-ui/core';
import React, { useState } from 'react'
import { Card as CardUI } from '@material-ui/core';

interface Props {
  name: string,
  id?: string,
  startMode?: CardMode,
  onDelete: () => void,
  onSave: (cardData: { name: string }) => void,
  afterSave?: () => void
}

const useStyle = makeStyles({
  card: {
    margin: '5px 10px',
    // padding: '5px',
    backgroundColor: 'white',
  },
  editMode: {
    '& > *': {
      marginBottom: '5px',
      '&:last-child': {
        marginBottom: '0'
      }
    }
    // paddingBottom: '5px',
    // marginBottom: '5px'
  }
})

type CardMode = 'view' | 'edit';
export const Card: React.FC<Props> = ({ name: cardName, id, onDelete, afterSave, onSave, startMode = 'view' }: Props) => {
  const classes = useStyle();
  const [mode, setMode] = useState<CardMode>(startMode);
  const [name, setName] = useState(cardName);

  const showEditView = () => {
    setMode('edit');
  }

  const showDefaultView = () => {
    setMode('view');
  }
  const handleSave = () => {
    onSave({ name });
    if (afterSave)
      afterSave();
    else
      showDefaultView();
  }

  const handleChange: ((event: React.ChangeEvent<HTMLInputElement>) => void) = (e) => {
    setName(e.target.value);
  }
  return (<>
    <CardUI className={classes.card}>
      {
        mode == 'view' &&
        <Box display='flex' justifyContent='center' >
          <Box flexGrow={1}>
            <Typography>
              {name}
            </Typography>
          </Box>
          <Box>
            <Button size='small' variant='outlined' onClick={() => showEditView()}>Edit</Button>
          </Box>
        </Box>
      }
      {
        (mode == 'edit') &&
        <Box className={classes.editMode} display='flex' flexDirection='column'>
          <Box >
            <TextField autoFocus fullWidth value={name} onChange={handleChange} />
          </Box>
          <Box display='flex'>
            <Box flexGrow={1}>
              <Button size='small' variant='outlined' onClick={() => handleSave()}>Save</Button>
            </Box>
            <Button size='small' variant='outlined' onClick={() => onDelete()}>Delete</Button>
          </Box>
        </Box>
      }
    </CardUI>

  </>
  )
}
