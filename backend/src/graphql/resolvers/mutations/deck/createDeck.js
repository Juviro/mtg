export default async (_, __, { user: { id: userId }, db }) => {
  const [deck] = await db('decks')
    .insert({ userId })
    .returning('*');

  return deck;
};
