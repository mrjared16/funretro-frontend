import { Box, Button, makeStyles, TextField, Typography } from '@material-ui/core';
import React, { useState } from 'react'
import { Card as CardUI } from '@material-ui/core';

interface Props {
  name: string,
  id?: string,
  startMode?: CardMode,
  onDelete: () => void,
  onSave: (cardData: { name: string }) => void
}

const useStyle = makeStyles({
  card: {
    margin: '10px 5px',
    padding: '5px',
    backgroundColor: 'white',
  }
})

type CardMode = 'view' | 'edit';
export const Card: React.FC<Props> = ({ name: cardName, id, onDelete, onSave, startMode = 'view' }: Props) => {
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
            <Box>
              <Button onClick={() => showEditView()}>Edit</Button>
            </Box>
          </Box>
        </Box>
      }
      {
        (mode == 'edit') &&
        <Box display='flex' flexDirection='column'>
          <Box>
            <TextField fullWidth value={name} onChange={handleChange} />
          </Box>
          <Box display='flex' alignItems='center' justifyContent='center'>
            <Box flexGrow={1}>
              <Button onClick={() => handleSave()}>Save</Button>
            </Box>
            <Button onClick={() => onDelete()}>Delete</Button>
          </Box>
        </Box>
      }
    </CardUI>

  </>
  )
}
