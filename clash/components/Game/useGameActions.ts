import {
  MoveCardDetails,
  MoveCardPayload,
  SOCKET_MSG_GAME,
  SendMessagePayload,
  SetCommanderTimesCastedPayload,
  SetPlayerLifePayload,
} from 'backend/constants/wsEvents';
import { Zone } from 'backend/database/gamestate.types';
import SocketContext from 'components/SocketContext/SocketContextProvider';
import { useContext } from 'react';

const useGameActions = () => {
  const { socket } = useContext(SocketContext);

  const onDrawCard = () => {
    socket?.emit(SOCKET_MSG_GAME.DRAW_CARD);
  };

  const onMoveCard = (
    clashId: string,
    toZone: Zone,
    zonePlayerId: string,
    details?: MoveCardDetails
  ) => {
    const payload: MoveCardPayload = {
      clashId,
      to: { zone: toZone, playerId: zonePlayerId },
      ...details,
    };
    socket?.emit(SOCKET_MSG_GAME.MOVE_CARD, payload);
  };

  const onSendChatMessage = (message: SendMessagePayload) => {
    socket?.emit(SOCKET_MSG_GAME.SEND_CHAT_MESSAGE, message);
  };

  const onSetCommanderTimesCasted = (commanderClashId: string, total: number) => {
    const payload: SetCommanderTimesCastedPayload = { commanderClashId, total };
    socket?.emit(SOCKET_MSG_GAME.SET_COMMANDER_TIMES_CASTED, payload);
  };

  const setPlayerLife = (forPlayerId: string, total: number) => {
    const payload: SetPlayerLifePayload = { total, forPlayerId };
    socket?.emit(SOCKET_MSG_GAME.SET_PLAYER_LIFE, payload);
  };

  return {
    onDrawCard,
    onMoveCard,
    onSendChatMessage,
    onSetCommanderTimesCasted,
    setPlayerLife,
  };
};

export default useGameActions;
