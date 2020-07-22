import React from 'react';
import { Select, Typography } from 'antd';
import { useQuery, useMutation } from 'react-apollo';

import CustomSkeleton from '../CustomSkeleton';
import { addCardsToWantsList, wantsLists as wantsListsQuery } from './queries';
import message from '../../../../utils/message';
import { wantsList as wantsListQuery } from '../../../Mobile/WantsList/queries';
import { getCardByOracleId } from '../../../Mobile/Card/queries';

const NEW_LIST_DUMMY_ID = 'new-wants-list';
const DEFAULT_NEW_LIST_NAME = 'New Wants List';

export default ({
  cardIds,
  oracle_id,
  newListName = DEFAULT_NEW_LIST_NAME,
  title = 'Add to wants list...',
}) => {
  const { data, loading } = useQuery(wantsListsQuery);
  const [mutate] = useMutation(addCardsToWantsList);

  if (loading) {
    return <CustomSkeleton.Line />;
  }

  const { wantsLists } = data;

  const onAddToList = id => {
    const { name } = wantsLists.find(wantsList => wantsList.id === id) || {
      name: newListName,
    };

    const refetchQueries = [];
    if (id !== NEW_LIST_DUMMY_ID) {
      refetchQueries.push({
        query: wantsListQuery,
        variables: { id },
      });
    }
    if (oracle_id) {
      refetchQueries.push({
        query: getCardByOracleId,
        variables: { oracle_id },
      });
    }

    mutate({
      variables: {
        wantsListId: id,
        wantsListName: id === NEW_LIST_DUMMY_ID ? newListName : undefined,
        cards: cardIds.map(cardId => ({ id: cardId })),
      },
      refetchQueries,
    });

    message(`Added to <b>${name}</b>!`);
  };

  const addDeckElement = {
    name: '+ New list',
    id: NEW_LIST_DUMMY_ID,
  };

  const selectOptions = [addDeckElement, ...wantsLists];

  return (
    <Select style={{ width: '100%' }} onChange={onAddToList} value={title}>
      {selectOptions.map(({ id, name }) => (
        <Select.Option value={id} key={id}>
          <Typography.Text type={id === NEW_LIST_DUMMY_ID ? 'secondary' : 'primary'}>
            {name}
          </Typography.Text>
        </Select.Option>
      ))}
    </Select>
  );
};
