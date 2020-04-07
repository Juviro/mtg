import React from 'react';
import { Drawer } from 'antd';

import { useQuery } from 'react-apollo';
import CardSearch from '../../Shared/CardSearch';
import { getCollectionNames } from '../../../../queries';

export default ({ containedCardNames, isVisible, onClose, onAddCard }) => {
  const searchInputRef = React.createRef();
  const { data } = useQuery(getCollectionNames);

  const afterVisibleChange = visible => {
    if (!visible) return;
    searchInputRef.current.focus();
  };

  const ownedCardNames = data
    ? data.collection.cards.map(({ card: { name } }) => name)
    : [];

  return (
    <Drawer
      height={100}
      placement="bottom"
      title="Add Cards"
      visible={isVisible}
      onClose={onClose}
      bodyStyle={{ padding: 4 }}
      destroyOnClose
      afterVisibleChange={afterVisibleChange}
    >
      <CardSearch
        alignTop
        resetSearch
        width="100%"
        ownedCardNames={ownedCardNames}
        ref={searchInputRef}
        onSearch={onAddCard}
        containedCardNames={containedCardNames}
        defaultActiveFirstOption
      />
    </Drawer>
  );
};