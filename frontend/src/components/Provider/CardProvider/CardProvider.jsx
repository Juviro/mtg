import React, { useState, useEffect } from 'react';
import { getCollectionFromCache } from './cardCache';
import { CARD_TYPES } from './staticTypes';

const CardContext = React.createContext({});

export const CardContextProvider = ({ children }) => {
  const [cardNames, setCardNames] = useState();
  const [cards, setCards] = useState([]);
  const [creatureTypes, setCreatureTypes] = useState([]);
  const [sets, setSets] = useState({});

  const getSets = async () => {
    const allSets = await getCollectionFromCache('sets');
    setSets(allSets);
  };
  const getCreatureTypes = async () => {
    const allcreatureTypes = await getCollectionFromCache('creatureTypes');
    setCreatureTypes(allcreatureTypes);
  };
  const getCards = async () => {
    const allCards = await getCollectionFromCache('cards');
    const fullCards = allCards.map(({ i, n, k, o }) => ({
      id: i,
      oracle_id: o,
      name: n,
      imgKey: k,
    }));
    setCards(fullCards);
    setCardNames(fullCards.map(({ name }) => name));
  };

  useEffect(() => {
    getSets();
    getCreatureTypes();
    getCards();
  }, []);

  return (
    <CardContext.Provider
      value={{
        cardNames,
        cards,
        creatureTypes,
        sets,
        cardTypes: CARD_TYPES,
      }}
    >
      {children}
    </CardContext.Provider>
  );
};

export default CardContext;
