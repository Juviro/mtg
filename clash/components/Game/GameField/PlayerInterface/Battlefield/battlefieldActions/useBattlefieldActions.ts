import { MenuProps } from 'antd';

import { BattlefieldCard, Player, ZONES } from 'backend/database/gamestate.types';
import useMoveCardActions from 'components/GameComponents/Card/cardActions/useMoveCardActions';
import { RefObject } from 'react';
import useGameActions from 'components/Game/useGameActions';
import useCreateTokenActions from './useCreateTokenActions';

interface Props {
  cards: BattlefieldCard[];
  player: Player;
  battlefieldRef: RefObject<HTMLDivElement>;
}

const useBattlefieldActions = ({ cards, player, battlefieldRef }: Props) => {
  const cardIds = cards.map((card) => card.clashId);
  const { onTapCards } = useGameActions();
  const moveCardActions = useMoveCardActions({
    cardIds,
    player,
    zone: ZONES.BATTLEFIELD,
  });

  const onUntapBoard = () => {
    onTapCards({
      cardIds,
      battlefieldPlayerId: player.id,
      tapped: false,
    });
  };

  const createTokenActions = useCreateTokenActions({ cards, player, battlefieldRef });

  const battlefieldActions: MenuProps['items'] = [
    {
      key: 'untap-all',
      label: 'Untap board [U]',
      onClick: onUntapBoard,
    },
    {
      key: 'move-to',
      label: 'Move all cards to...',
      disabled: !cardIds.length,
      children: moveCardActions,
    },
    {
      key: 'create-token',
      label: 'Create token',
      children: createTokenActions,
    },
  ];

  return battlefieldActions;
};

export default useBattlefieldActions;
