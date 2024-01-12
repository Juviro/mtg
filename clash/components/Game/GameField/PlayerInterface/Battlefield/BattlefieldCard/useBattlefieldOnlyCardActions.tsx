import { MouseEvent } from 'react';
import { MenuProps } from 'antd';

import { BattlefieldCard, Player } from 'backend/database/gamestate.types';
import useGameActions from 'components/Game/useGameActions';
import { DEFAULT_COUNTERS } from 'constants/counters';

interface Props {
  card: BattlefieldCard;
  player: Player;
}

const useBattlefieldOnlyCardActions = ({ card, player }: Props) => {
  const { onAddCounters } = useGameActions();

  const onAddCounter = (type: string) => (e: MouseEvent) => {
    e.stopPropagation();
    onAddCounters({
      cardIds: [card.clashId],
      type,
      battlefieldPlayerId: player.id,
      amount: 1,
    });
  };

  const additionalBattlefieldContextMenuItems: MenuProps['items'] = [
    {
      type: 'divider',
    },
    {
      key: 'add-counter',
      label: 'Add counter...',
      children: DEFAULT_COUNTERS.map(({ type, label }) => ({
        key: type,
        // prevent the context menu from closing when clicking on the label,
        // that way the user can add multiple counters in a row
        label: <div onClick={onAddCounter(type)}>{label}</div>,
      })),
    },
  ];

  return additionalBattlefieldContextMenuItems;
};

export default useBattlefieldOnlyCardActions;
