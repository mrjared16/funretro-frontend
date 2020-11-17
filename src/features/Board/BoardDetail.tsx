import { Box, Button, Card as CardUI, Container, makeStyles, Typography } from '@material-ui/core';
import React, { useEffect, useMemo, useState } from 'react';
import { boardAPI } from './boardAPI';
import { Card } from './Card';
import { cardAPI } from './cardAPI';
import { BoardDTO } from './interfaces/board.dto';
import { CardDTO } from './interfaces/card.dto';
import { ListDTO } from './interfaces/list.dto';
import { List } from './List';

interface Props {
  id: string
}

const useStyle = makeStyles({
  header: {
    padding: '1em',
  },
  board: {

  }
});

export const BoardDetail: React.FC<Props> = ({ id: idBoard }: Props) => {
  const classes = useStyle();

  const [isLoading, setIsLoading] = useState(true);
  const [board, setBoard] = useState<BoardDTO>();
  const [lists, setLists] = useState<ListDTO[]>([]);
  const [cards, setCards] = useState<CardDTO[]>([]);

  const cardDictionary = useMemo(() => {
    return cards.reduce(
      (cardDictionary: Record<string, CardDTO[]>, currentCard) => {
        const idList = currentCard.idList;

        if (cardDictionary[idList]) {
          const cardList: CardDTO[] = cardDictionary[idList];
          const cardABeforeCardB = (a: CardDTO, b: CardDTO) => a.pos < b.pos;

          let i = 0;
          while (i < cardList.length && cardList[i].pos < currentCard.pos) i++;

          const newCardList = cardList.slice();
          newCardList.splice(i, 0, currentCard);
          cardDictionary[idList] = newCardList;
        }
        else {
          cardDictionary[idList] = [{ ...currentCard }];
        }

        return cardDictionary;
      }, {})
  }, [lists, cards]);

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

  const handleAddCard = (idBoard: string, idList: string) => (cardData: { name: string }) => {
    const { name } = cardData;
    const BUFFER = 65353;
    const maxPos = !!cardDictionary[idList]
      ? cardDictionary[idList].reduce((max, cur) => cur.pos > max ? cur.pos : max, 0)
      : 0;
    const pos = maxPos + BUFFER;
    async function addCard() {
      const newCard: CardDTO = await cardAPI.addCard({ idBoard, idList, name, pos });
      setCards((prev) => [...prev, newCard]);
    }
    addCard();
  }

  const handleUpdateCard = (id: string) => (cardData: { name: string }) => {
    const { name } = cardData;
    cardAPI.updateCard(id, { name });
    setCards((prev) => prev.map(card => {
      if (card.id == id) {
        return { ...card, ...cardData }
      }
      return card;
    }));
  }

  const handleDeleteCard = (id: string) => () => {
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
              lists.map((list) =>
                <List
                  key={list.id}
                  cards={cardDictionary[list.id]}
                  {...list}
                  onAddCard={handleAddCard}
                  onUpdateCard={handleUpdateCard}
                  onDeleteCard={handleDeleteCard}
                />
              )
            }
          </Box>
        </Container>
      }
    </>
  )
}
