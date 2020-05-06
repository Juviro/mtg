import React from 'react';
import { Typography } from 'antd';
import styled from 'styled-components';
import { CustomSkeleton } from '../../../Shared';

const StyledWrapper = styled.span`
  height: 55px;
`;

export default ({ card, loading }) => {
  return loading ? (
    <StyledWrapper>
      <CustomSkeleton.Line />
    </StyledWrapper>
  ) : (
    <Typography.Title level={2}>{card.name}</Typography.Title>
  );
};