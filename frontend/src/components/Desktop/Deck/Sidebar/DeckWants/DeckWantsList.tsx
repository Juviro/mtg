import React, { useContext } from 'react';

import { CardGrid } from 'components/Elements/Desktop';
import { OneTimeInfoBox } from 'components/Elements/Shared';
import FocusContext from 'components/Provider/FocusProvider/FocusProvider';

import { WantsList } from 'types/graphql';
import unifyCardFormat from 'utils/unifyCardFormat';

interface Props {
  wantsList: WantsList;
}

export default ({ wantsList }: Props) => {
  const { focusedElements } = useContext(FocusContext);
  // check if this has focus, ignore if details modal is open
  const blockShortcuts =
    focusedElements.filter((focusId) => focusId !== 'modal.cardDetails').pop() !==
    'deck.sidebar.wants';

  const cards = unifyCardFormat(wantsList.cards);

  return (
    <>
      <OneTimeInfoBox
        showIcon
        id="deck.wants.drag"
        description="Drag and drop cards to add them to your deck or other wants lists"
      />
      <CardGrid
        draggable
        cards={cards}
        cardsPerRow={2}
        cardWidth={200}
        // onEnter={onEnter}
        blockShortcuts={blockShortcuts}
      />
    </>
  );
};
