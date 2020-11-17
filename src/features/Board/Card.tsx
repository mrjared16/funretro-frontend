import { Box, Button, makeStyles, TextField, Typography } from '@material-ui/core';
import React, { useState } from 'react'
import { cardAPI } from './cardAPI';

interface Props {
  name: string,
  id: string,
  onDelete: () => void,
  onSave: () => void
}

const useStyle = makeStyles({
  card: {
    margin: '5px',
    padding: '5px',
    backgroundColor: 'white',
  }
})
type CardMode = 'view' | 'add' | 'edit';
export const Card: React.FC<Props> = ({ name: cardName, id, onDelete }: Props) => {
  const classes = useStyle();
  const [mode, setMode] = useState<CardMode>('view');
  const [name, setName] = useState(cardName);

  const onEdit = () => {
    setMode('edit');
  }
  const onAdd = () => {
    setMode('add');
  }
  const onView = () => {
    setMode('view');
  }
  const onSave = () => {
    onView();
  }

  const handleChange: ((event: React.ChangeEvent<HTMLInputElement>) => void) = (e) => {
    setName(e.target.value);
  }
  return (<>
    {
      mode == 'view' &&
      <Box display='flex' alignItems='center' justifyContent='center' className={classes.card}>
        <Box flexGrow={1}>
          <Typography>
            {name}
          </Typography>

        </Box>
        <Box>
          <Box>
            <Button onClick={() => onEdit()}>Edit</Button>
          </Box>
        </Box>
      </Box>
    }
    {
      (mode == 'edit' || mode == 'add') &&
      <Box display='flex' flexDirection='column' className={classes.card}>
        <Box>
          <TextField fullWidth value={name} onChange={handleChange} />
        </Box>
        <Box display='flex' alignItems='center' justifyContent='center'>
          <Box flexGrow={1}>
            <Button onClick={() => onSave()}>Save</Button>
          </Box>
          <Button onClick={() => onDelete()}>Delete</Button>
        </Box>
      </Box>
    }

  </>
  )
}
