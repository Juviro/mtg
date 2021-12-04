import fetch from 'node-fetch';

const getUrl = (names, themeSuffix) => {
  const sanitizedNames = names
    .join(' ')
    .toLowerCase()
    .replace(/\s\/\/.*$/, '')
    .replace(/[^a-zA-Z- ]/g, '')
    .replace(/\s/g, '-');

  if (!themeSuffix) {
    return `https://json.edhrec.com/commanders/${sanitizedNames}.json`;
  }

  return `https://json.edhrec.com/commanders/${sanitizedNames}${themeSuffix}.json`;
};

const formatCards = cards => {
  return cards
    .map(({ prices, name, synergy, image_uris }) => {
      const [_, imgKey, id] = image_uris?.[0]?.small?.match(
        /front\/(\w\/\w)\/(.*)\./
      );

      return {
        id,
        imgKey,
        name,
        priceUsd: prices.tcgplayer?.price,
        priceEur: prices.cardmarket?.price,
        synergy,
      };
    })
    .sort((a, b) => (b.synergy || 0) - (a.synergy || 0));
};

const fetchCards = async (url, names) => {
  const result = await fetch(url);
  const json = await result.json();

  // partner commanders have to bee in a specific order
  // a redirect url is passed in those cases, but we can simply reverse the names as well
  if (json.redirect) {
    const newUrl = getUrl(names.reverse());
    return fetchCards(newUrl);
  }

  return json;
};

const getCardList = json => {
  const { cardlists } = json.container.json_dict;

  return cardlists?.map(({ header, cardviews, tag }) => ({
    key: tag,
    title: header,
    cards: formatCards(cardviews),
  }));
};

const getThemes = json => {
  const { themes } = json.panels.tribelinks;

  return themes?.map(theme => ({
    title: theme.value,
    urlSuffix: theme['href-suffix'],
    count: theme.count,
  }));
};

const getEdhrecCards = async (names, themeSuffix) => {
  if (!names.length) return null;

  const url = getUrl(names, themeSuffix);

  const json = await fetchCards(url, names);

  const cardLists = getCardList(json);
  const themes = getThemes(json);

  return {
    cardLists,
    themes,
  };
};

export default getEdhrecCards;
