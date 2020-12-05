import React, { useRef, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { useDrag } from 'react-dnd';

import FlippableCard from '../../../Shared/FlippableCard';
import { primary } from '../../../../../constants/colors';
import scrollIntoView from '../../../../../utils/scrollIntoView';
import { useShortcut, useToggle } from '../../../../Hooks';
import CardInfo from './CardInfo';
import { ContextMenu } from '../../../Shared';

const StyledCenterWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledCardWrapper = styled.div`
  height: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: relative;
  width: 220px;
  height: 360px;
`;

const StyledContextMenu = styled.div`
  position: absolute;
  right: 8%;
  top: 11%;
  border-radius: 50%;
  padding: 4px;
  background-color: rgba(255, 255, 255, 0.6);
  display: flex;
  transition: scale 0.2s;
`;

const StyledImageWrapper = styled.div`
  position: relative;
  border-radius: 4%;
  background-color: white;
  width: 100%;
  height: 100%;

  ${({ isSelected }) =>
    isSelected
      ? css`
          box-shadow: 0px 0px 6px 6px ${primary};
        `
      : ''}
  ${({ markAsDisabled }) =>
    markAsDisabled
      ? css`
          opacity: 0.4;
        `
      : ''}
`;

const StyledAmountWrapper = styled.div`
  padding: 1% 12px;
  position: absolute;
  background-color: #aebde6;
  opacity: 0.8;
  bottom: 0;
  align-self: flex-start;
  border-top-right-radius: 8px;
  border-bottom-left-radius: 8px;
`;

const StyledScrollDummy = styled.div`
  position: absolute;
  width: 100%;
  height: calc(100% + 150px);
  top: -75px;
  z-index: -1;
  user-select: none;
`;

const GridCard = ({
  card,
  onDeleteCard,
  onClick,
  isSelected,
  actions = [],
  search,
  onEditCard,
  shortcutsActive,
  markAsDisabled,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  index: _index,
  dragProps,
}) => {
  const { canDrag = false, listId, onSuccessfullDrop } = dragProps ?? {};
  const displayedAmount = card.amount || card.totalAmount;
  const [showMenu, toggleShowMenu] = useToggle();
  useShortcut('BACKSPACE', shortcutsActive && onDeleteCard ? onDeleteCard : null);
  useShortcut('e', shortcutsActive && onEditCard ? onEditCard : null);
  const scrollDummyRef = useRef(null);

  const [, dragRef] = useDrag({
    item: { type: 'CARD', id: card.id, name: card.name, listId, amount: card.amount },
    canDrag,
    end: (_, monitor) => {
      if (monitor.didDrop() && onSuccessfullDrop) {
        onSuccessfullDrop(card);
      }
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  useEffect(() => {
    if (!isSelected || !scrollDummyRef) return;
    scrollIntoView(scrollDummyRef.current);
  }, [isSelected]);

  return (
    <StyledCenterWrapper>
      <StyledCardWrapper key={card.id}>
        <StyledScrollDummy ref={scrollDummyRef} />
        <StyledImageWrapper
          isSelected={isSelected}
          onClick={onClick}
          onMouseMove={() => toggleShowMenu(true)}
          onMouseLeave={() => toggleShowMenu(false)}
          markAsDisabled={markAsDisabled}
          ref={dragRef}
        >
          <FlippableCard
            card={card}
            lazyLoadProps={{
              offset: 200,
              overflow: true,
            }}
          />
          {displayedAmount > 1 && (
            <StyledAmountWrapper>{`${displayedAmount}x`}</StyledAmountWrapper>
          )}
          {Boolean(showMenu && actions.length) && (
            <StyledContextMenu>
              <ContextMenu card={card} menuItems={actions} />
            </StyledContextMenu>
          )}
        </StyledImageWrapper>
        <CardInfo card={card} search={search} />
      </StyledCardWrapper>
    </StyledCenterWrapper>
  );
};

const areEqual = (prevProps, nextProps) => {
  if (prevProps.isSelected !== nextProps.isSelected) return false;
  if (prevProps.widthPercentage !== nextProps.widthPercentage) return false;
  if (prevProps.width !== nextProps.width) return false;
  if (prevProps.loading !== nextProps.loading) return false;
  if (prevProps.index !== nextProps.index) return false;
  if (prevProps.search !== nextProps.search) return false;
  if (prevProps.shortcutsActive !== nextProps.shortcutsActive) return false;
  if (prevProps.markAsDisabled !== nextProps.markAsDisabled) return false;

  return ['id', 'amount', 'owned', 'totalAmount', 'sumPrice', 'minPrice'].every(
    (propKey) => prevProps.card[propKey] === nextProps.card[propKey]
  );
};

export default React.memo(GridCard, areEqual);
