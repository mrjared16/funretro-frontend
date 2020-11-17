import { Box, Button, Card as CardUI, Container, makeStyles, Typography } from '@material-ui/core'
import React, { Suspense, useEffect, useMemo, useState } from 'react'
import { boardAPI } from './boardAPI'
import { Card } from './Card';
import { cardAPI } from './cardAPI';
import { BoardDTO } from './interfaces/board.dto';
import { CardDTO } from './interfaces/card.dto';
import { ListDTO } from './interfaces/list.dto';

interface Props {
  id: string
}

const useStyle = makeStyles({
  header: {
    padding: '1em',
  },
  board: {

  },
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

export const BoardDetail: React.FC<Props> = ({ id: idBoard }: Props) => {
  const classes = useStyle();
  const [board, setBoard] = useState<BoardDTO>();
  const [lists, setLists] = useState<ListDTO[]>([]);
  const [cards, setCards] = useState<CardDTO[]>([]);

  const cardDictionary = useMemo(() => {
    // console.log('useMemo: ', { cards });
    return cards.reduce(
      (cardDictionary: Record<string, CardDTO[]>, currentCard) => {
        const idList = currentCard.idList;

        if (cardDictionary[idList]) {
          const cardList: CardDTO[] = cardDictionary[idList];
          const cardABeforeCardB = (a: CardDTO, b: CardDTO) => a.pos < b.pos;

          let i = 0;
          while (i < cardList.length - 1 && !cardABeforeCardB(cardList[i], cardList[i + 1])) i++;

          const newCardList = [...cardList];
          newCardList.splice(i, 0, currentCard);
          cardDictionary[idList] = newCardList;
        }
        else {
          cardDictionary[idList] = [{ ...currentCard }];
        }

        console.log({ newMemo: { ...cardDictionary } })
        return cardDictionary;
      }, {})
  }, [lists, cards]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function getBoard() {
      const { cards, lists, members, ...boardData } = await boardAPI.getBoard(idBoard);
      setBoard(prev => ({ ...boardData }));
      setLists(prev => lists.slice());
      setCards(prev => cards.slice());
      setIsLoading(false);
      console.log({ boardData, cards, lists, members });
    }
    getBoard();
  }, []);

  const onAddCard = (idBoard: string, idList: string) => () => {
    console.log('addCard');
    const name = 'New to do';
    const pos = 10;
    async function addCard() {
      const newCard: CardDTO = await cardAPI.addCard({ idBoard, idList, name, pos });
      setCards((prev) => [...prev, newCard]);
    }
    addCard();
  }

  const onDeleteCard = (id: string) => () => {
    cardAPI.deleteCard(id);
    const newCards = cards.filter(card => card.id != id);
    setCards((prev) => newCards);
  }
  return (
    <>
      { isLoading
        ? 'Loading'
        : <Container>
          <Box className={classes.header}>
            <Typography color='textPrimary' variant='h6'>
              {board?.name}
            </Typography>
          </Box>
          <Box display='flex' flexWrap='noWrap' className={classes.board}>
            {
              lists.map(({ name: listName, id: idList, color }) => (
                <Box flexGrow={1} key={idList} className={classes.list}>
                  <CardUI className={classes.listContainer} style={{ backgroundColor: `#${color}` }} >
                    <Box className={classes.listName}>
                      <Typography color='inherit'>
                        {listName}
                      </Typography>
                    </Box>
                    <Box className={classes.cards}>
                      {
                        !!cardDictionary[idList] && cardDictionary[idList].map(({ name: cardName, id: idCard }) =>
                          <Card
                            key={idCard}
                            name={cardName}
                            id={idCard}
                            onDelete={onDeleteCard(idCard)}
                            onSave={() => { }} />
                        )
                      }
                    </Box>
                    <Box>
                      <Button fullWidth onClick={onAddCard(idBoard, idList)}>Add new card</Button>
                      {/* <Button onClick={() => onAddCard(idBoard, idList)}>Create new card</Button> */}
                    </Box>
                  </CardUI>
                </Box>
              ))
            }
          </Box>
        </Container>
      }
    </>
  )
}
