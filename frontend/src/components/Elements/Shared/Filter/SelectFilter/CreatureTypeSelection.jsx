import React, { useContext } from 'react';

import CardContext from '../../../../CardProvider/CardProvider';
import SelectFilter from './SelectFilter';

export default ({ onChange, value, onSearch }) => {
  const { creatureTypes } = useContext(CardContext);

  return (
    <SelectFilter
      options={creatureTypes}
      onChange={onChange}
      value={value}
      onSearch={onSearch}
      paramName="creatureType"
      placeholder="Shark, Bird, ..."
    />
  );
};
