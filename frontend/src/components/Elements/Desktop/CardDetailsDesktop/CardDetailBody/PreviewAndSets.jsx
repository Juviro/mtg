import React from 'react';
import styled from 'styled-components';
import { Col, Row } from 'antd';

import { FlippableCard } from '../../../Shared';
import CardSets from './CardSets';

const StyledCardImage = styled.div`
  display: flex;
  height: 490px;
  width: 350px;
  max-width: 30vw;
  max-height: 41.8vw;
`;

export default ({
  card,
  loading,
  selectedCardId,
  setSelectedCardId,
  showTitle,
  toggleIsFlipped,
}) => {
  return (
    <Row style={{ width: '100%', maxHeight: 490 }}>
      <Col span={8}>
        <StyledCardImage>
          <FlippableCard
            card={card}
            loading={loading}
            onFlipCard={toggleIsFlipped}
          />
        </StyledCardImage>
      </Col>
      <Col span={16} style={{ padding: '0 24px', flexDirection: 'row' }}>
        <CardSets
          showTitle={showTitle}
          card={card}
          loading={loading}
          selectedCardId={selectedCardId}
          onChangeSet={setSelectedCardId}
        />
      </Col>
    </Row>
  );
};
