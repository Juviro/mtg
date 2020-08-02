import React from 'react';
import { Typography, Button } from 'antd';
import styled from 'styled-components';

import sumCardAmount from '../../../../utils/sumCardAmount';

const StyledLabel = styled(Typography.Text).attrs({ type: 'secondary' })`
  margin: 8px;
  font-size: 16px;
`;

export default ({ deck, displayOwnedOnly, toggleDisplayOwnedOnly }) => {
  const numberOfUnowned = deck.cards.filter(({ owned }) => !owned).length;

  const unownedLabel = displayOwnedOnly
    ? 'show all cards'
    : `(${numberOfUnowned} unowned)`;

  return (
    <span>
      <StyledLabel>{`${sumCardAmount(deck.cards)} cards`}</StyledLabel>
      {Boolean(numberOfUnowned) && (
        <Button type="link" onClick={toggleDisplayOwnedOnly} style={{ padding: 0 }}>
          {unownedLabel}
        </Button>
      )}
    </span>
  );
};
