import gql from 'graphql-tag';

const CARD_FIELDS = `
  id
  oracle_id
  name
  owned
  minPrice
  imgKey
  isTwoFaced
  amount
  cmc
`;

const WANTS_LIST_FIELDS = `
  id
  name
  lastEdit
  cards {
    ${CARD_FIELDS}
  }
`;

export const wantsList = gql`
  query wantsList($id: String!) {
    wantsList(id: $id) {
      ${WANTS_LIST_FIELDS}
    }
  }
`;

export const addCardsToWantsList = gql`
  mutation addCardsToWantsList($cards: [CardInputType!]!, $wantsListId: String!) {
    addCardsToWantsList(cards: $cards, wantsListId: $wantsListId) {
      ${CARD_FIELDS}
    }
  }
`;

export const editWantsList = gql`
  mutation editWantsList(
    $wantsListId: String!
    $newProperties: EditWantsListFieldsInput!
  ) {
    editWantsList(wantsListId: $wantsListId, newProperties: $newProperties) {
      id
      name
      lastEdit
    }
  }
`;

export const deleteFromWantsList = gql`
  mutation deleteFromWantsList($cardId: String!, $wantsListId: String!) {
    deleteFromWantsList(cardId: $cardId, wantsListId: $wantsListId) {
      ${WANTS_LIST_FIELDS}
    }
  }
`;