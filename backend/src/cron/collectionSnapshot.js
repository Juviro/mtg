import db from '../database';

export default async () => {
  const users = await db('users').select('id');
  const userIds = users.map(({ id }) => id);

  for (const userId of userIds) {
    const {
      rows: [{ value }],
    } = await db.raw(
      `
      SELECT SUM(
        coalesce(LEAST((prices->>'usd')::float, (prices->>'usd_foil')::float), 0) * amount + 
        coalesce(GREATEST((prices->>'usd')::float, (prices->>'usd_foil')::float), 0) * "amountFoil"
        )::int as value
        coalesce(LEAST((prices->>'eur')::float, (prices->>'eur_foil')::float), 0) * amount + 
        coalesce(GREATEST((prices->>'eur')::float, (prices->>'eur_foil')::float), 0) * "amountFoil"
        )::int as valueEur
      FROM collection 
      LEFT JOIN cards 
        ON cards.id = collection.id
      WHERE "userId"=?;
    `,
      [userId]
    );
    if (!value) continue;

    await db.raw(
      `
      INSERT INTO "collectionSnapshot" (
        SELECT 
          "userId", 
          ?, 
          SUM(amount) as amount,
          count(*) as "amountUnique" 
          FROM (
            SELECT 
              SUM(amount + "amountFoil") as amount, 
              "userId" 
            FROM "collectionWithOracle"
            WHERE "userId" = ?
            GROUP BY oracle_id, "userId"
          ) as grouped
        WHERE "userId" = ?
        GROUP BY "userId"
      )
      `,
      [value, userId, userId]
    );
  }
};
