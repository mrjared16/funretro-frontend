import { Box, Card, Container, makeStyles, Typography } from '@material-ui/core'
import React, { Suspense, useEffect, useMemo, useState } from 'react'
import { boardAPI } from './boardAPI'
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
    backgroundColor: 'red'
  },
  listName: {
    padding: '10px 8px',
    '&>*': {
      fontWeight: 'bold'
    }
  },
  cards: {
    margin: '5px'
  },
  card: {
    margin: '5px',
    padding: '5px',
    backgroundColor: 'blue',
  }
});

export const BoardDetail: React.FC<Props> = ({ id }: Props) => {
  const classes = useStyle();
  const [board, setBoard] = useState<BoardDTO>();
  const [lists, setLists] = useState<ListDTO[]>([]);
  const [cards, setCards] = useState<CardDTO[]>([]);

  const listDictionary = useMemo(() => {
    // console.log('useMemo: ', { cards });
    return cards.reduce(
      (memo: Record<string, CardDTO[]>, cur) => {
        // console.log({ memo, cur });
        if (memo[cur.idList]) {
          memo[cur.idList].push(cur);
        }
        else {
          memo[cur.idList] = [cur];
        }

        return memo;
      }, {})
  }, [lists, cards]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function getBoard() {
      const { cards, lists, members, ...boardData } = await boardAPI.getBoard(id);
      setBoard(prev => ({ ...boardData }));
      setLists(prev => lists.slice());
      setCards(prev => cards.slice());
      setIsLoading(false);
      console.log({ boardData, cards, lists, members });
    }
    getBoard();
  }, [])
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
                <Box flexGrow={1} key={idList} className={classes.list} style={{backgroundColor: color}}>
                  <Card className={classes.listContainer}>
                    <Box className={classes.listName}>
                      <Typography color='textPrimary'>
                        {listName}
                        {color}
                      </Typography>
                    </Box>
                    <Box className={classes.cards}>
                      {
                        !!listDictionary[idList] && listDictionary[idList].map(({ name: cardName, id: idCard }) =>
                          <Box key={idList} className={classes.card}>
                            <Typography>
                              {cardName}
                            </Typography>
                          </Box>
                        )
                      }
                    </Box>
                  </Card>
                </Box>
              ))
            }
          </Box>
        </Container>
      }
    </>
  )
}
