import React from 'react';
import { useMutation } from 'react-apollo';
import { getMobileCollection, addToCollectionMobile } from './queries';

import { AddCardMobile } from '../../Elements/Mobile';
import message from '../../../utils/message';

export default () => {
  const [mutate] = useMutation(addToCollectionMobile);

  const onAddCard = (newCard, name) => {
    message(`Added <b>${name}</b> to your collection!`);
    mutate({
      variables: { cards: [newCard] },
      update: (cache, { data: updateData }) => {
        if (!updateData) return;
        const { addToCollection: newCards } = updateData;
        const existing = cache.readQuery({
          query: getMobileCollection,
        });

        const existingCards = existing.collection.cards.filter(
          ({ card: { oracle_id } }) =>
            !newCards.some(({ card }) => card.oracle_id === oracle_id)
        );

        cache.writeQuery({
          query: getMobileCollection,
          data: {
            collection: {
              ...existing.collection,
              cards: existingCards.concat(newCards),
            },
          },
        });
      },
    });
  };

  return <AddCardMobile onAddCard={onAddCard} />;
};
