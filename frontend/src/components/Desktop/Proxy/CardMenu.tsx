import { CloseOutlined } from '@ant-design/icons';
import React from 'react';
import styled from 'styled-components';
import { primary } from '../../../constants/colors';

const StyledRemoveButton = styled(CloseOutlined)`
  font-size: 50px;
  position: absolute;
  display: none;
  right: 10px;
  color: white;
  top: 10px;

  &:hover {
    color: #cb1212;
  }
`;

const StyledAmountWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 16px;
  width: 100%;
  justify-content: center;
  text-shadow: 2px 2px 0px #333;
`;

const StyledAmount = styled.div<{ defaultHidden: boolean }>`
  font-size: 80px;
  ${({ defaultHidden }) => defaultHidden && 'display: none;'}
`;

const StyledMenuIcon = styled.span`
  cursor: pointer;
  display: none;
  font-size: 60px;
  position: absolute;
  padding: 10px;
  transition: all 0.05s ease-in-out;

  &:hover {
    color: ${primary};
    transform: scale(1.1);
  }
`;

const StyledMenu = styled.div`
  width: 100%;
  height: 100%;
  color: white;
  position: absolute;
  display: flex;
  justify-content: center;
  user-select: none;
  transition: background-color 0.1s ease-in-out;

  &:hover {
    background-color: rgba(0, 0, 0, 0.7);

    & ${StyledMenuIcon}, ${StyledRemoveButton}, ${StyledAmount} {
      display: inherit;
    }
  }
`;

interface Props {
  amount: number;
  onSetAmount: (amount: number) => void;
  onRemoveCard: () => void;
}

const CardMenu = ({ amount, onSetAmount, onRemoveCard }: Props) => {
  return (
    <StyledMenu>
      <StyledRemoveButton onClick={onRemoveCard} />
      <StyledAmountWrapper>
        <StyledMenuIcon onClick={() => onSetAmount(amount - 1)} style={{ left: 20 }}>
          -
        </StyledMenuIcon>
        <StyledAmount defaultHidden={amount === 1}>{amount}</StyledAmount>
        <StyledMenuIcon onClick={() => onSetAmount(amount + 1)} style={{ right: 20 }}>
          +
        </StyledMenuIcon>
      </StyledAmountWrapper>
    </StyledMenu>
  );
};

export default CardMenu;
