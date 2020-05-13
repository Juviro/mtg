import React, { useRef, useEffect } from 'react';
import styled, { css } from 'styled-components';

import { primary } from '../../../../../../constants/colors';
import scrollIntoView from '../../../../../../utils/scrollIntoView';
import CardMenu from './CardMenu';
import { FlippableCard, AmountBadge } from '../../../../../Elements/Shared';

export const CARD_WIDTH = 220;
const CARD_HEIGHT = CARD_WIDTH * 1.4;

const ANIMATION_DURATION = 100;

const StyledWrapper = styled.div`
  left: 0;
  width: ${CARD_WIDTH}px;

  position: relative;
  user-select: none;

  transition: margin-bottom ${ANIMATION_DURATION}ms;

  ${({ isSelected }) =>
    isSelected
      ? css`
          &:not(:last-child) {
            margin-bottom: 130%;
          }
        `
      : ''}

  &:not(:first-child) {
    margin-top: ${40 - CARD_HEIGHT}px;
  }
`;

const StyledScrollDummy = styled.div`
  position: absolute;
  width: 100%;
  height: 128%;
  top: -15%;
  z-index: -1;
  user-select: none;
`;

const StyledCard = styled.div`
  width: 100%;
  height: ${CARD_HEIGHT}px;
  border-radius: 4%;
  cursor: pointer;
  background-color: #cecece;
  border: 1px solid black;
  overflow: hidden;
  position: relative;
  ${({ isSelected }) =>
    isSelected
      ? css`
          box-shadow: 0px 0px 6px 6px ${primary};
        `
      : ''}
`;

const Card = ({
  card,
  isSelected,
  onOpenDetails,
  setSelectedCardOracleId,
  onDelete,
}) => {
  const ref = useRef(null);

  const onClick = () => {
    const newSelectedCardOracleId = isSelected ? null : card.oracle_id;
    setSelectedCardOracleId(newSelectedCardOracleId);
  };

  useEffect(() => {
    if (!isSelected || !ref) return;
    setTimeout(() => scrollIntoView(ref.current), ANIMATION_DURATION);
  }, [isSelected]);

  return (
    <StyledWrapper isSelected={isSelected}>
      <StyledScrollDummy ref={ref} />
      <StyledCard onClick={onClick} isSelected={isSelected}>
        <FlippableCard card={card} hideFlipIcon={!isSelected} />
        <AmountBadge amount={card.amount} />
      </StyledCard>
      {isSelected && (
        <CardMenu
          card={card}
          onOpenDetails={onOpenDetails}
          onDelete={onDelete}
        />
      )}
    </StyledWrapper>
  );
};

const areEqual = (prevProps, nextProps) => {
  if (prevProps.isSelected !== nextProps.isSelected) return false;

  return ['id', 'amount', 'owned', 'sumPrice', 'minPrice'].every(
    propKey => prevProps.card[propKey] === nextProps.card[propKey]
  );
};

export default React.memo(Card, areEqual);
