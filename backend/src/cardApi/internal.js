import db from '../database';

const sortByName = (a, b) => (a.name > b.name ? 1 : -1);
const sortById = (a, b) => (a.id > b.id ? 1 : -1);

// TODO: split up into multiple files

// TODO: evaluate which of these functions is more accurate
// const getEuroPrice = ({ usd, usd_foil }) => Number(usd || usd_foil) * 0.9 || 0;

// Prices in euro are a bit deflated
const getEuroPrice = ({ eur, usd, usd_foil }) =>
  Number(eur) * 1.1 || Number(usd || usd_foil) * 0.9 || 0;

const getPriceLabel = amountInEuro => {
  const formatPrice = amount =>
    Number(amount).toLocaleString('de-DE', {
      style: 'currency',
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
      currency: 'EUR',
    });

  return amountInEuro ? formatPrice(amountInEuro) : '-';
};

export const addAdditionalProperties = ({ type_line, owned, ...rest }) => {
  const [mainTypes, flipTypes] = type_line.split(' // ');
  const [primaryTypes, subTypes] = mainTypes
    .split(' — ')
    .map(part => part.split(' '));
  const showAsOwned = Boolean(owned || primaryTypes.includes('Basic'));
  const priceInEuro = getEuroPrice(rest.prices);
  const priceLabel = getPriceLabel(priceInEuro);

  return {
    type_line,
    primaryTypes,
    subTypes,
    flipTypes: flipTypes && flipTypes.split(' '),
    owned: showAsOwned,
    priceInEuro,
    priceLabel,
    ...rest,
  };
};

// TODO try to deprecate this
export const populateCards = async cards => {
  const sortedCards = cards.sort(sortById);
  const ids = sortedCards.map(({ id }) => id);

  const rawCards = await db('cards')
    .whereIn('id', ids)
    .orderBy('id', 'ASC');

  const populatedCards = rawCards
    .map((card, index) => ({
      ...card,
      ...cards[index],
    }))
    .map(addAdditionalProperties);

  return populatedCards.sort(sortByName);
};

export const populateCardsBySelector = async (selector, cards) => {
  const query = db('cards')
    .whereIn(
      selector,
      cards.map(card => card[selector])
    )
    .toString();
  const orderClause = ` ORDER BY oracle_id, (prices->>'eur')::float`;
  const { rows: dbCards } = await db.raw(query + orderClause);

  const filteredCards = dbCards.filter(
    (card, index) =>
      !cards[index - 1] || card.oracle_id !== cards[index - 1].oracle_id
  );

  const cardMap = filteredCards.reduce(
    (acc, card) => ({
      ...acc,
      [card[selector]]: card,
    }),
    {}
  );

  const populatedCards = cards.map(card => ({
    ...card,
    ...cardMap[card[selector]],
  }));

  return populatedCards;
};

export const populateCardsByName = async cards =>
  populateCardsBySelector('name', cards);

export const populateCardsById = async cards =>
  populateCardsBySelector('id', cards);
