import { useContext } from 'react';

import {
  MoveCardDetails,
  MoveCardPayload,
  SOCKET_MSG_GAME,
  SetPhasePayload,
  SendMessagePayload,
  SetCommanderTimesCastedPayload,
  SetPlayerLifePayload,
  PeekPayload,
  SearchLibraryPayload,
  EndPeekPayload,
  MoveCardsGroupPayload,
  TapCardsPayload,
  FlipCardsPayload,
  MillPayload,
  AddCountersPayload,
  CreateTokenPayload,
  CopyCardPayload,
  AcceptHandPayload,
  TurnCardsFaceDownPayload,
  ChatCommandPayload,
  PeekFaceDownPayload,
  PlayTopCardFaceDownPayload,
  RotateCardsPayload,
  SetCommanderDamagePayload,
  SetStopPointPayload,
} from 'backend/constants/wsEvents';
import { Phase, Zone } from 'backend/database/gamestate.types';
import SocketContext from 'components/SocketContext/SocketContextProvider';
import useLocalStorage from 'hooks/useLocalStorage';
import {
  DEFAULT_SETTINGS,
  Settings,
  SETTINGS_STORAGE_KEY,
} from './InitSettings/InitSettings';

const useGameActions = () => {
  const { socket } = useContext(SocketContext);
  const [settings] = useLocalStorage<Settings>(SETTINGS_STORAGE_KEY, DEFAULT_SETTINGS);

  const onAcceptHand = (payload: AcceptHandPayload) => {
    socket?.emit(SOCKET_MSG_GAME.ACCEPT_HAND, payload);
  };

  const onTakeMulligan = () => {
    socket?.emit(SOCKET_MSG_GAME.TAKE_MULLIGAN);
  };

  const onDrawCard = () => {
    socket?.emit(SOCKET_MSG_GAME.DRAW_CARD);
  };

  const onMoveCard = (
    clashId: string,
    toZone: Zone,
    zonePlayerId: string,
    details?: MoveCardDetails,
    faceDown?: boolean
  ) => {
    const payload: MoveCardPayload = {
      clashId,
      faceDown,
      to: { zone: toZone, playerId: zonePlayerId },
      ...details,
    };
    socket?.emit(SOCKET_MSG_GAME.MOVE_CARD, payload);
  };

  const onMoveCardsGroup = (
    cardIds: string[],
    battlefieldPlayerId: string,
    delta: { x: number; y: number }
  ) => {
    const payload: MoveCardsGroupPayload = {
      cardIds,
      battlefieldPlayerId,
      delta,
    };
    socket?.emit(SOCKET_MSG_GAME.MOVE_CARDS_GROUP, payload);
  };

  const onDiscardRandomCard = (playerId: string) => {
    socket?.emit(SOCKET_MSG_GAME.DISCARD_RANDOM_CARD, { playerId });
  };

  const onAddCounters = (payload: AddCountersPayload) => {
    socket?.emit(SOCKET_MSG_GAME.ADD_COUNTER, payload);
  };

  const createToken = (payload: CreateTokenPayload) => {
    socket?.emit(SOCKET_MSG_GAME.CREATE_TOKEN, payload);
  };

  const copyCard = (payload: CopyCardPayload) => {
    socket?.emit(SOCKET_MSG_GAME.COPY_CARD, payload);
  };

  const onTapCards = (payload: TapCardsPayload) => {
    socket?.emit(SOCKET_MSG_GAME.TAP_CARDS, payload);
  };

  const onFlipCards = (payload: FlipCardsPayload) => {
    socket?.emit(SOCKET_MSG_GAME.FLIP_CARDS, payload);
  };

  const onRotateCards = (payload: RotateCardsPayload) => {
    socket?.emit(SOCKET_MSG_GAME.ROTATE_CARDS, payload);
  };

  const onTurnFaceDown = (payload: TurnCardsFaceDownPayload) => {
    socket?.emit(SOCKET_MSG_GAME.TURN_FACE_DOWN, payload);
  };

  const onPlayTopLibraryCardFaceDown = (payload: PlayTopCardFaceDownPayload) => {
    socket?.emit(SOCKET_MSG_GAME.PLAY_TOP_CARD_FACE_DOWN, payload);
  };

  const onPeekFaceDown = (payload: PeekFaceDownPayload) => {
    socket?.emit(SOCKET_MSG_GAME.PEEK_FACE_DOWN, payload);
  };

  const onMill = (playerId: string, amount: number) => {
    const payload: MillPayload = { playerId, amount };
    socket?.emit(SOCKET_MSG_GAME.MILL, payload);
  };

  const onPeek = (playerId: string, zone: Zone, amount: number) => {
    const payload: PeekPayload = { playerId, zone, amount };
    socket?.emit(SOCKET_MSG_GAME.PEEK, payload);
  };

  const onEndPeek = (payload: EndPeekPayload) => {
    socket?.emit(SOCKET_MSG_GAME.END_PEEK, payload);
  };

  const onSearchLibrary = (playerId: string) => {
    const payload: SearchLibraryPayload = { playerId };
    socket?.emit(SOCKET_MSG_GAME.SEARCH_LIBRARY, payload);
  };

  const onShuffle = () => {
    socket?.emit(SOCKET_MSG_GAME.SHUFFLE_LIBRARY);
  };

  const onSendChatMessage = (message: SendMessagePayload) => {
    socket?.emit(SOCKET_MSG_GAME.SEND_CHAT_MESSAGE, message);
  };

  const onExecuteCommand = (command: ChatCommandPayload) => {
    socket?.emit(SOCKET_MSG_GAME.EXECUTE_COMMAND, command);
  };

  const onSetCommanderTimesCasted = (commanderClashId: string, total: number) => {
    const payload: SetCommanderTimesCastedPayload = { commanderClashId, total };
    socket?.emit(SOCKET_MSG_GAME.SET_COMMANDER_TIMES_CASTED, payload);
  };

  const setPlayerLife = (forPlayerId: string, total: number) => {
    const payload: SetPlayerLifePayload = { total, forPlayerId };
    socket?.emit(SOCKET_MSG_GAME.SET_PLAYER_LIFE, payload);
  };

  const setCommanderDamage = (
    total: number,
    commanderId: string,
    forPlayerId: string
  ) => {
    const payload: SetCommanderDamagePayload = {
      commanderId,
      total,
      forPlayerId,
      changeLife: settings.commanderDamageChangesLife,
    };
    socket?.emit(SOCKET_MSG_GAME.SET_COMMANDER_DAMAGE, payload);
  };

  const setPhase = (phase: Phase) => {
    const payload: SetPhasePayload = { phase };
    socket?.emit(SOCKET_MSG_GAME.SET_PHASE, payload);
  };

  const setStopPoint = (phase: Phase) => {
    const payload: SetStopPointPayload = { phase };
    socket?.emit(SOCKET_MSG_GAME.SET_STOP_POINT, payload);
  };

  const endTurn = () => {
    socket?.emit(SOCKET_MSG_GAME.END_TURN);
  };

  const restartGame = () => {
    socket?.emit(SOCKET_MSG_GAME.RESTART_GAME);
  };

  const resignGame = () => {
    socket?.emit(SOCKET_MSG_GAME.RESIGN_GAME);
  };

  return {
    onAcceptHand,
    onTakeMulligan,
    onDrawCard,
    onMoveCard,
    onMoveCardsGroup,
    onDiscardRandomCard,
    onAddCounters,
    createToken,
    copyCard,
    onTapCards,
    onFlipCards,
    onRotateCards,
    onTurnFaceDown,
    onPlayTopLibraryCardFaceDown,
    onPeekFaceDown,
    onMill,
    onPeek,
    onEndPeek,
    onSearchLibrary,
    onShuffle,

    onSendChatMessage,
    onExecuteCommand,
    onSetCommanderTimesCasted,
    setPlayerLife,
    setCommanderDamage,
    setPhase,
    setStopPoint,
    endTurn,
    restartGame,
    resignGame,
  };
};

export default useGameActions;
