export default async (
  _,
  { deckId, newProperties: { imgSrc, name } },
  { user, db }
) => {
  const [result] = await db('decks')
    .where({ userId: user.id, id: deckId })
    .update({
      imgSrc,
      name,
      lastEdit: new Date(),
    })
    .returning('*');

  return result;
};
