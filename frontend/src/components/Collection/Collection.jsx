import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import { getCollection } from '../../queries';

import ListView from './ListView';
import Header from './Header';

export default () => {
  const { data, loading } = useQuery(getCollection);
  const cards = (data && data.collection) || [];

  return (
    <>
      <Header />
      <ListView cards={cards} loading={loading} />
    </>
  );
};
