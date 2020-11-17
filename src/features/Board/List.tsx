import { Box, Button, Card as CardUI, makeStyles, Typography } from '@material-ui/core';
import React, { useState } from 'react'
import { Card } from './Card';
import { CardDTO } from './interfaces/card.dto';

interface Props {
  id: string;
  name: string;
  color: string;
  cards: CardDTO[];
  onAddCard: (idBoard: string, idList: string) => (cardData: {
    name: string;
  }) => void;
  onUpdateCard: (idCard: string) => (cardData: {
    name: string;
  }) => void;
  onDeleteCard: (id: string) => () => void;
}

const useStyle = makeStyles({
  list: {
    minWidth: '200px',
    margin: '15px 4px',
    '&:first-child': {
      marginLeft: '8px'
    }
  },
  listContainer: {
    // backgroundColor: 'red'
  },
  listName: {
    padding: '10px 8px',
    '&>*': {
      fontWeight: 'bold',
      color: 'white'
    }
  },
  cards: {
    margin: '5px'
  }
});

export const List: React.FC<Props> = ({ cards = [], id, name, color, onDeleteCard, onUpdateCard, onAddCard }: Props) => {
  const classes = useStyle();
  const [addMode, setAddMode] = useState(false);
  return (
    <Box flexGrow={1} className={classes.list}>
      <CardUI className={classes.listContainer} style={{ backgroundColor: `#${color}` }} >
        <Box className={classes.listName}>
          <Typography color='inherit'>
            {name}
          </Typography>
        </Box>
        <Box className={classes.cards}>
          {
            cards.map(({ name: cardName, id: idCard }) =>
              <Card
                key={idCard}
                name={cardName}
                id={idCard}
                onDelete={onDeleteCard(idCard)}
                onSave={onUpdateCard(idCard)} />
            )
          }
        </Box>
        <Box>
          {addMode
            ? <Card name={''} startMode='edit' onDelete={() => { setAddMode(false) }} onSave={onAddCard('', id)} />
            : <Button fullWidth onClick={() => setAddMode(true)}>Add new card</Button>
          }
        </Box>
      </CardUI>
    </Box>
  )
}
