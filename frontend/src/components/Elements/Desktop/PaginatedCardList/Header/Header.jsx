import React from 'react';
import styled from 'styled-components';
import { LayoutPicker, SortPicker, Flex } from '../../../Shared';
import ZoomSlider from './ZoomSlider';

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;

export default ({ showZoomSlider, zoom, setZoom }) => {
  return (
    <StyledWrapper>
      <SortPicker />
      <Flex direction="row">
        {showZoomSlider && <ZoomSlider zoom={zoom} setZoom={setZoom} />}
        <LayoutPicker hideCard />
      </Flex>
    </StyledWrapper>
  );
};
