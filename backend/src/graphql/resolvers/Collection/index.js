import {
  populateCards,
  populateCardsByName,
  populateCardsById,
} from '../../../cardApi/';

const ON_DUPLICATE =
  ' ON CONFLICT (id, "userId") DO UPDATE SET amount = collection.amount + EXCLUDED.amount, "createdAt" = NOW()';

// TODO: refactor this. remove populating, we only need the oracle id,
// which might be queried when inserting.
// otherwise, consider a collection view that has that id
const addToCollection = async (cards, userId, db) => {
  console.log('cards :', cards);
  if (!cards.length) return;
  const withoutDuplicates = cards.filter(
    ({ id }, index) => index === cards.findIndex(card => card.id === id)
  );
  const withUserId = withoutDuplicates.map(
    ({ id, oracle_id, amount = 1, amountFoil = 0 }) => ({
      id,
      oracle_id,
      userId,
      amount,
      amountFoil,
    })
  );
  console.log('withUserId :', withUserId);

  await db.raw(
    db('collection')
      .insert(withUserId)
      .toString() + ON_DUPLICATE
  );
};

const getCollection = async (userId, db) => {
  const collection = await db('collection')
    .leftJoin('cardsBySet', {
      'collection.oracle_id': 'cardsBySet.oracle_id ',
    })
    .where({ userId });
  const cards = await populateCards(collection);

  return { id: userId, cards };
};

export default {
  Query: {
    collection: async (_, _1, { user, db }) => getCollection(user.id, db),
  },
  Mutation: {
    addToCollectionById: async (_, { cards }, { user, db }) => {
      const populatedCards = await populateCardsById(cards);
      await addToCollection(populatedCards, user.id, db);

      return getCollection(user.id, db);
    },
    addToCollectionByName: async (_, { cards }, { user, db }) => {
      const populatedCards = await populateCardsByName(cards);
      await addToCollection(populatedCards, user.id, db);

      return getCollection(user.id, db);
    },
    changeCollection: async (
      _,
      { added = [], edited = [], deleted = [] },
      { user, db }
    ) => {
      const promises = [];

      edited.forEach(({ id, amount, amountFoil }) => {
        const promise = db('collection')
          .update({ amount, amountFoil })
          .where({ id, userId: user.id });

        promises.push(promise);
      });

      added.forEach(({ id, amount, amountFoil }) => {
        const promise = db.raw(
          `
            INSERT INTO collection 
              (id, "userId", amount, "amountFoil", oracle_id) 
            VALUES 
              (?, ?, ?, ?, (SELECT oracle_id FROM cards WHERE id = ?))
            ${ON_DUPLICATE};
        `,
          [id, user.id, amount, amountFoil, id]
        );

        promises.push(promise);
      });

      if (deleted.length) {
        const promise = db('collection')
          .where({ userId: user.id })
          .andWhereIn('id', deleted)
          .del();
        promises.push(promise);
      }

      await Promise.all(promises);

      return false;
    },
    deleteFromCollection: async (_, { cardIds }, { user, db }) => {
      await db('collection')
        .whereIn('id', cardIds)
        .andWhere({ userId: user.id })
        .del();

      return getCollection(user.id, db);
    },
  },
};
