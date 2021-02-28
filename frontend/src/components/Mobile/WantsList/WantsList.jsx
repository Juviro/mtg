import React, { useEffect } from 'react';
import { Divider } from 'antd';
import styled from 'styled-components';
import { useQuery } from 'react-apollo';
import { useParams } from 'react-router';
import { wantsList as wantsListQuery } from './queries';

import Header from './Header';
import AddWants from './AddWants';
import { LayoutAndSortPicker, NotFound } from '../../Elements/Shared';

import unifyCardFormat from '../../../utils/unifyCardFormat';
import { WantsListMobile } from '../../Elements/Mobile';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 16px 8px;
`;

export default () => {
  const { id } = useParams();
  const { data, loading } = useQuery(wantsListQuery, {
    variables: { id },
  });
  console.log('data', data);

  const wantsList = data?.wantsList;
  const cards = wantsList && unifyCardFormat(wantsList.cards);
  const unifiedWantsList = wantsList && {
    ...wantsList,
    cards,
  };
  const canEdit = wantsList?.canEdit;

  useEffect(() => {
    if (!loading) return;
    setTimeout(() => window.scrollTo(0, 0), 100);
    // eslint-disable-next-line
  }, [loading]);

  if (!data && !loading) {
    return <NotFound message="This wants list does not seem to exist.." />;
  }

  return (
    <StyledWrapper>
      <Header wantsList={unifiedWantsList} canEdit={canEdit} />
      <LayoutAndSortPicker showCollectionFilters />
      <Divider />
      <WantsListMobile
        cards={cards}
        loading={loading}
        canEdit={canEdit}
        rawWantsList={data && data.wantsList}
      />
      {canEdit && <AddWants containedCards={cards} />}
    </StyledWrapper>
  );
};
