import gql from 'graphql-tag';

export const CARD_FIELDS = `
  id
  set
  name
  rarity
  image_uris {
    small
    normal
    art_crop
  }
  card_faces {
    name
    image_uris {
      small
      normal
      art_crop
    }
    colors
  }
  prices {
    eur
    usd
    usd_foil
  }
  legalities {
    standard
    modern
    commander
  }
  oracle_id
  all_sets {
    id
    set
    prices {
      eur
      usd
      usd_foil
    }
    image_uris {
      small
      normal
    }
    card_faces {
      image_uris {
        small
        normal
      }
    }
  }
  rulings_uri
`;

const CARD_BY_ORACLE_ID_FIELDS = `
  name  
  oracle_id
  rulings_uri
  legalities {
    commander
  }

  all_sets {
    id
    set
    set_name
    prices {
      eur
      usd
      usd_foil
    }
    image_uris {
      small
      normal
    }
  }
`;

export const cachedCards = gql`
  query cachedCards {
    cachedCards {
      i
      n
      s
      o
    }
  }
`;

export const getCard = gql`
  query getCard($id: String!) {
      card(id: $id) {
        ${CARD_FIELDS}
      }
    }
`;

export const getCardByOracleId = gql`
  query cardsByOracleId($oracle_id: String!) {
    cardsByOracleId(oracle_id: $oracle_id) {
        ${CARD_BY_ORACLE_ID_FIELDS}
      }
    }
`;

export const searchCard = gql`
  query searchCard($query: String, $limit: Int) {
    searchCard(query: $query, limit: $limit) {
        ${CARD_FIELDS}
      }
    }
`;
