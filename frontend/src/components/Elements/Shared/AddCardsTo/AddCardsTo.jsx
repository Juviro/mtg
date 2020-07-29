import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from 'react-apollo';
import { Spin, Collapse } from 'antd';
import styled from 'styled-components';

import { RightOutlined } from '@ant-design/icons';
import Flex from '../Flex';
import { allLists } from './queries';
import Lists from './Lists';
import SimpleCardsList from '../SimpleCardsList';
import { addCardsToDeckDesktop } from '../../../Desktop/Deck/queries';
import message from '../../../../utils/message';
import { addToCollectionDesktop } from '../../../Desktop/Collection/queries';
import {
  addCardsToWantsListDesktop,
  wantsListDesktop,
} from '../../../Desktop/WantsList/queries';
import sumCardAmount from '../../../../utils/sumCardAmount';
import FocusedModal from '../FocusedModal';
import CheckableCardlist from '../CheckableCardlist/CheckableCardlist';
import ButtonGroup from '../ButtonGroup/ButtonGroup';
import ListSelection from './ListSelection';

export const StyledCollapse = styled(Collapse)`
  && {
    border: none;
    background-color: white;
  }
  &.ant-collapse-content {
    border-top: none;
  }
  &.ant-collapse-item {
    border-bottom: none;
  }
`;

const formatCards = cards =>
  cards.map(({ id, amount, totalAmount }) => ({
    id,
    amount: amount || totalAmount || 1,
  }));

export default ({ onSubmit, cardsToAdd }) => {
  const { data, loading } = useQuery(allLists, { fetchPolicy: 'network-only' });

  const [selectedCardIds, setSelectedCardIds] = useState([]);

  useEffect(() => {
    if (selectedCardIds.length || !cardsToAdd.length) return;
    setSelectedCardIds(cardsToAdd.map(({ id }) => id));
  }, [cardsToAdd]);

  return (
    <Flex direction="row">
      <CheckableCardlist
        cards={cardsToAdd}
        setSelectedCardIds={setSelectedCardIds}
        selectedCardIds={selectedCardIds}
      />
      <Flex align="center">
        <RightOutlined style={{ fontSize: 32 }} />
      </Flex>
      <ListSelection onSubmit={onSubmit} allLists={data?.allLists} loading={loading} />
      {/* <StyledCollapse>
          <Collapse.Panel
            key="1"
            header={numberOfSelectedCards && `${numberOfSelectedCards} cards selected`}
          >
            <SimpleCardsList cards={cardsToAdd} />
          </Collapse.Panel>
        </StyledCollapse> */}
      {/* {loading ? (
          <Flex align="center" justify="center" style={{ height: 200 }}>
            <Spin />
          </Flex>
        ) : (
          <Lists
            data={data}
            cardsToAdd={cardsToAdd}
            onAddToDeck={onAddToDeck}
            onAddToWantsList={onAddToWantsList}
            onAddToCollection={onAddToCollection}
          />
        )} */}
    </Flex>
  );
};
