import React, { useState } from 'react';
import { Spin, Pagination } from 'antd';
import { useQueryParam, StringParam } from 'use-query-params';
import styled from 'styled-components';

import { filterByName } from '../../../../utils/cardFilter';
import { useWindowSize } from '../../../Hooks';
import useGridShortcuts from './useGridShortcuts';
import CardModalDesktop from '../../CardModalDesktop';
import GridCard from './GridCard';
import getNumberOfCards from './getNumberOfCards';
import usePreloadCards from '../../../Hooks/usePreloadCards';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  overflow: hidden;
  padding-top: 8px;
  height: ${({ height }) => height}px;
`;

// TODO: add shortcut to change layout
// TODO: add sort by
export default ({ cards, loading, widthOffset }) => {
  useWindowSize();
  const [showDetails, setShowDetails] = useState(false);
  const toggleShowDetail = () => setShowDetails(!showDetails);

  const [query] = useQueryParam('name', StringParam);
  const filteredCards = filterByName(cards, query);
  const { cardsPerRow, numberOfRows, CARD_HEIGHT } = getNumberOfCards(
    widthOffset
  );

  const {
    pagination,
    selectedElementPosition,
    setSelectedElementPosition,
  } = useGridShortcuts(
    cardsPerRow,
    numberOfRows,
    toggleShowDetail,
    filteredCards.length
  );

  const firstCard = pagination.pageSize * (pagination.current - 1);
  const currentCards = filteredCards.slice(
    firstCard,
    firstCard + pagination.pageSize
  );
  const selectedCard = currentCards[selectedElementPosition - 1];
  usePreloadCards(filteredCards, firstCard, pagination.pageSize);

  if (loading) return <Spin />;

  const onClick = index => {
    setSelectedElementPosition(index + 1);
    toggleShowDetail();
  };

  return (
    <>
      <StyledWrapper height={numberOfRows * CARD_HEIGHT}>
        {currentCards.map((card, index) => (
          <GridCard
            card={card}
            index={index}
            key={card.id}
            onClick={onClick}
            selectedElementPosition={selectedElementPosition}
          />
        ))}
      </StyledWrapper>
      <Pagination
        {...pagination}
        showSizeChanger={false}
        style={{ alignSelf: 'flex-end', margin: '16px 0' }}
      />
      <CardModalDesktop
        card={selectedCard}
        visible={showDetails}
        onClose={toggleShowDetail}
      />
    </>
  );
};