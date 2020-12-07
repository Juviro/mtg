import React, { useState, useEffect } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';

import { SetIcon } from '../../../Shared';
import { cardsBySet } from './queries';
import SetSelection from '../../../Shared/Filter/SelectFilter/SetSelection';
import { formatCachedCards } from '../../../../../utils/cachedCards';

const getSetIcon = (setKey) => <SetIcon setKey={setKey} style={{ marginRight: 6 }} />;

export default ({ setCardOptions }) => {
  const [setKey, setSetId] = useState(null);

  const [fetchCards, { data, loading }] = useLazyQuery(cardsBySet, {
    variables: {
      setKey,
    },
    fetchPolicy: 'cache-first',
  });

  useEffect(() => {
    if (!setKey) return;
    setCardOptions({ loading: true });
    fetchCards();
    // eslint-disable-next-line
  }, [setKey]);

  useEffect(() => {
    if (loading || !data) return;
    if (!setKey) {
      setCardOptions({ cards: null });
      return;
    }
    const cards = formatCachedCards(data.cardsBySet);
    setCardOptions({ cards, cardPrefix: getSetIcon(setKey) });
    // eslint-disable-next-line
  }, [loading, data, setKey]);

  return (
    <SetSelection
      onChange={setSetId}
      value={setKey}
      placeholder="Select Set..."
      allowClear
      size="small"
    />
  );
};
