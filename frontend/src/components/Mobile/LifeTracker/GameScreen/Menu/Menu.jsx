import React from 'react';
import styled, { css } from 'styled-components';

import { Flex } from '../../../../Elements/Shared';
import icon from '../../../../../assets/icons/favicon.ico';
import { primary } from '../../../../../constants/colors';
import { useToggle } from '../../../../Hooks';
import MenuItems from './MenuItems';

const StyledIconWrapper = styled.div`
  border-radius: 50%;
  border: 3px solid black;
  background-color: ${primary};
  padding: 8px;
  pointer-events: auto;
  z-index: 10;

  ${({ isOpen }) =>
    isOpen &&
    css`
      transform: scale(0.95);
    `}
`;

const StyledMenuIcon = styled.img`
  height: 32px;
  width: 32px;
`;

export default ({ handle, onRestartGame }) => {
  const [isOpen, toggleIsOpen] = useToggle();

  return (
    <Flex
      justify="center"
      align="center"
      style={{
        top: 0,
        width: '100vw',
        height: '100vh',
        position: 'absolute',
        pointerEvents: 'none',
      }}
    >
      <StyledIconWrapper isOpen={isOpen} onClick={toggleIsOpen}>
        <StyledMenuIcon src={icon} />
      </StyledIconWrapper>
      <MenuItems
        isOpen={isOpen}
        handle={handle}
        onCloseMenu={toggleIsOpen}
        onRestartGame={onRestartGame}
      />
    </Flex>
  );
};

// exit, <CloseOutlined />
// restart <UndoOutlined />
