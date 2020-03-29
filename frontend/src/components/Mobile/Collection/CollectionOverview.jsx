import React from 'react';
import { Card, Descriptions } from 'antd';
import styled from 'styled-components';
import { getPriceLabel } from '../../../utils/cardStats';

const StyledCard = styled(Card)`
  width: 100%;
`;

export default ({
  cards,
  size = 'small',
  layout = 'horizontal',
  column = 3,
}) => {
  const numberOfUniqueCards = cards ? cards.length : 0;
  const numberOfCards = (cards || []).reduce(
    (sum, { totalAmount }) => sum + totalAmount,
    0
  );
  const collectionValue = (cards || []).reduce(
    (sum, { sumPrice }) => sum + sumPrice,
    0
  );

  return (
    <StyledCard loading={!cards} title="Your Collection" size={size}>
      <Descriptions size={size} layout={layout} column={column}>
        <Descriptions.Item label="Total Cards">
          {numberOfCards}
        </Descriptions.Item>
        <Descriptions.Item label="Unique Cards">
          {numberOfUniqueCards}
        </Descriptions.Item>
        <Descriptions.Item label="Total value">
          {getPriceLabel(collectionValue, { round: true })}
        </Descriptions.Item>
      </Descriptions>
    </StyledCard>
  );
};
