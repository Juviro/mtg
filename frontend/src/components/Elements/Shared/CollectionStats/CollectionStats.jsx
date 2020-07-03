import React from 'react';
import { Skeleton } from 'antd';
import { useQuery } from '@apollo/react-hooks';

import Statistic from './Statistic';
import CollectionCharts from '../CollectionCharts';
import { currentSnapshots as getCurrentSnapshot } from './queries';
import Flex from '../Flex';

export default ({ small, showCharts }) => {
  const { data, loading } = useQuery(getCurrentSnapshot);

  const currentSnapshot = data ? data.collection.currentSnapshot : {};
  currentSnapshot.dateLabel = 'Now';
  const referenceSnapshot = data ? data.collection.referenceSnapshot : {};

  return (
    <Flex direction="column" justify="space-between" width="100%">
      {loading ? (
        <Skeleton />
      ) : (
        <>
          <Statistic
            small={small}
            title="Total Cards"
            value={currentSnapshot.amount}
            referenceValue={referenceSnapshot.amount}
          />
          <Statistic
            small={small}
            title="Unique Cards"
            value={currentSnapshot.amountUnique}
            referenceValue={referenceSnapshot.amountUnique}
          />
          <Statistic
            small={small}
            title="Total value"
            value={currentSnapshot.value}
            suffix="$"
            referenceValue={referenceSnapshot.value}
          />
          {showCharts && <CollectionCharts currentSnapshot={currentSnapshot} />}
        </>
      )}
    </Flex>
  );
};
