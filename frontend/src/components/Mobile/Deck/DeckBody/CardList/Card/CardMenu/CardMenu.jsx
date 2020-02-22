import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Icon } from 'antd';
import CardInfo from './CardInfo';
import CardEdit from './CardEdit';

const StyledInnerStatsWrapper = styled.div`
  display: flex;
  margin-top: 32px;
  margin-left: -100vw;
  overflow: hidden;
  position: absolute;
  flex-direction: column;
  transition: all 0.2s;
  width: calc(50vw - 16px);
  height: 0;

  ${({ isVisible }) => {
    if (!isVisible) return '';
    return `
      margin-left: 8px;
      height: calc((50vw * 1.35));
    `;
  }}
`;

const StyledIconWrapper = styled.div`
  display: flex;
  align-self: flex-end;
  transition: all 0.2s;
  flex-direction: row;
  align-items: center;

  margin-right: ${({ isEditing }) => (isEditing ? '0' : '-34px')};
`;

const StyledLabel = styled.span`
  font-weight: 500;
`;

export default ({ card, isVisible, isLegal }) => {
  const [isEditing, setIsEditing] = useState(false);
  const onToggleEdit = () => setIsEditing(!isEditing);

  useEffect(() => {
    if (!isVisible && isEditing) setIsEditing(false);
  }, [isVisible, isEditing]);

  return (
    <div>
      <StyledInnerStatsWrapper isVisible={isVisible}>
        <StyledIconWrapper onClick={onToggleEdit} isEditing={isEditing}>
          <Icon
            type={isEditing ? 'right' : 'edit'}
            style={{ color: '#1890ff', marginRight: 4 }}
          />
          <StyledLabel>Back</StyledLabel>
        </StyledIconWrapper>
        {!isEditing ? (
          <CardInfo card={card} isLegal={isLegal} />
        ) : (
          <CardEdit card={card} />
        )}
      </StyledInnerStatsWrapper>
    </div>
  );
};
