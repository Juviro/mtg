import { CARD_TYPE_DECK_ORDER } from 'components/Provider/CardProvider/staticTypes';
import { typeColors } from 'constants/colors';
import React from 'react';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from 'recharts';

import { UnifiedDeck } from 'types/unifiedTypes';
import { DeckStat } from './DeckStat';

interface Props {
  deck: UnifiedDeck;
}

const getPrimaryType = (primaryTypes: string[]) => {
  return primaryTypes.sort((a, b) => {
    if (CARD_TYPE_DECK_ORDER.indexOf(a) === -1) return 1;
    if (CARD_TYPE_DECK_ORDER.indexOf(b) === -1) return -1;

    return CARD_TYPE_DECK_ORDER.indexOf(a) - CARD_TYPE_DECK_ORDER.indexOf(b);
  })[0];
};

export const DeckCmc = ({ deck }: Props) => {
  const manaValues = deck.cards
    .filter((card) => !card.primaryTypes.includes('Land'))
    .reduce((acc, card) => {
      const { cmc, primaryTypes, amount } = card;

      const primaryType = getPrimaryType(primaryTypes);

      const cmcByType = acc[cmc] ?? {};
      const currentCount = cmcByType[primaryType] ?? 0;

      return {
        ...acc,
        [cmc]: {
          ...cmcByType,
          [primaryType]: currentCount + amount,
        },
      };
    }, {});

  const data: { cmc: number; [key: string]: number }[] = Object.keys(manaValues)
    .map((key) => ({ cmc: Number(key), ...manaValues[key] }))
    .sort((a, b) => a.cmc - b.cmc)
    .reduce((acc, val) => {
      if (!acc.length) return [val];

      const lastCmc = acc[acc.length - 1].cmc;
      const diffToPrevious = val.cmc - lastCmc;
      if (diffToPrevious === 1) return [...acc, val];

      // Some cmc values are missing in between, fill them in here
      const dummies = [...new Array(diffToPrevious - 1)].map((_, index) => ({
        cmc: lastCmc + index + 1,
        amount: 0,
      }));

      return [...acc, ...dummies, val];
    }, []);

  return (
    <DeckStat title="Mana Curve:" hidden={!data.length}>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 20,
            left: 20,
            bottom: 20,
          }}
        >
          <XAxis dataKey="cmc" />
          <Tooltip />
          {CARD_TYPE_DECK_ORDER.map((type) => (
            <Bar
              key={type}
              dataKey={type}
              stackId="a"
              maxBarSize={50}
              name={type}
              fill={typeColors[type]}
              isAnimationActive={false}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </DeckStat>
  );
};
