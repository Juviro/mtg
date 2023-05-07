import React, { useState } from 'react';
import { useQuery } from '@apollo/client';

import PageLayout from '../../Elements/Desktop/PageLayout/PageLayout';
import { PageCard } from '../../Elements/Desktop/PageLayout';
import { Query } from '../../../types/graphql';
import { collectionBySet } from './queries';
import CBSOverview from './CBSOverview';
import useLocalStorage from '../../Hooks/useLocalStorage';
import CBSOptions, { INITIAL_DISPLAYD_SET_TYPES } from './CBSOptions';
import Spinner from '../../Elements/Shared/Spinner';

// TODO: IDEAS

// Allow sorting by
// - release date
// - # of Cards
// - Completion %

// add search

// Menu Point: Submenu of Collection

// grey out unreleased sets

// buggy (?)
// card_count includes all different versions of basic lands,
// which amounts to ~25 cards per set

const CollectionBySet = () => {
  const { data, loading } = useQuery<Query>(collectionBySet);
  const [groupBy, setGroupBy] = useLocalStorage('group-by', 'type');
  const [displayedSetTypes, setDisplayedSetTypes] = useState(INITIAL_DISPLAYD_SET_TYPES);

  return (
    <PageLayout>
      <CBSOptions
        groupBy={groupBy}
        setGroupBy={setGroupBy}
        displayedSetTypes={displayedSetTypes}
        setDisplayedSetTypes={setDisplayedSetTypes}
      />
      <PageCard>
        {loading ? (
          <Spinner />
        ) : (
          <CBSOverview
            sets={data.collectionBySet}
            groupBy={groupBy}
            displayedSetTypes={displayedSetTypes}
          />
        )}
      </PageCard>
    </PageLayout>
  );
};

export default CollectionBySet;
