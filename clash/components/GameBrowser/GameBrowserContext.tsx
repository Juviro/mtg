import React, { useContext, useEffect, useMemo, useState } from 'react';

import { LobbyDeck, GameOptions, Lobby } from 'backend/lobby/GameLobby.types';
import { User } from 'backend/database/getUser';
import SocketContext from 'components/SocketContext/SocketContextProvider';
import { SOCKET_MSG_LOBBY } from '../../backend/constants/wsEvents';

const GameBrowserContext = React.createContext<{
  openLobbies: Lobby[];
  currentLobby?: Lobby;
  user: User | null;
  onHostLobby: (gameOptions: GameOptions) => void;
  onJoinLobby: (id: string) => void;
  onLeaveLobby: () => void;
  onSelectDeck: (deck: LobbyDeck) => void;
  onReady: (isReady: boolean) => void;
  onStartMatch: () => void;
  onSelectColor?: (color: string) => void;
}>({
  openLobbies: [],
  user: null,
  /* eslint-disable @typescript-eslint/no-empty-function */
  onHostLobby: () => {},
  onJoinLobby: () => {},
  onLeaveLobby: () => {},
  onSelectDeck: () => {},
  onReady: () => {},
  onStartMatch: () => {},
  onSelectColor: () => {},
  /* eslint-enable @typescript-eslint/no-empty-function */
});

interface Props {
  children: React.ReactNode;
}

export const GameBrowserContextProvider = ({ children }: Props) => {
  const { user, emit, socket } = useContext(SocketContext);

  const [openLobbies, setOpenLobbies] = useState<Lobby[]>([]);

  useEffect(() => {
    if (!socket) return;
    socket.on(SOCKET_MSG_LOBBY.UPDATE_LOBBIES, (msg: Lobby[]) => {
      setOpenLobbies(msg);
    });
  }, [socket]);

  const onHostLobby = (gameOptions: GameOptions) => {
    emit(SOCKET_MSG_LOBBY.HOST_LOBBY, JSON.stringify(gameOptions));
  };

  const onJoinLobby = (id: string) => {
    emit(SOCKET_MSG_LOBBY.JOIN_LOBBY, id);
  };

  const currentLobby = openLobbies.find((lobby) =>
    lobby.players.some((player) => player.id === user?.id)
  );

  const onLeaveLobby = () => {
    if (!currentLobby) return;
    emit(SOCKET_MSG_LOBBY.LEAVE_LOBBY, currentLobby.id);
  };

  const onSelectDeck = (deck: LobbyDeck) => {
    if (!currentLobby) return;

    emit(SOCKET_MSG_LOBBY.SELECT_DECK, JSON.stringify(deck));
  };

  const onSelectColor = (color: string) => {
    if (!currentLobby) return;

    emit(SOCKET_MSG_LOBBY.SELECT_COLOR, color);
  };

  const onReady = (isReady: boolean) => {
    if (!currentLobby) return;

    emit(SOCKET_MSG_LOBBY.READY, isReady.toString());
  };

  const onStartMatch = () => {
    if (!currentLobby) return;

    emit(SOCKET_MSG_LOBBY.START_MATCH);
  };

  const value = useMemo(
    () => ({
      openLobbies,
      currentLobby,
      user,
      onHostLobby,
      onJoinLobby,
      onLeaveLobby,
      onSelectDeck,
      onReady,
      onStartMatch,
      onSelectColor,
    }),
    [
      openLobbies,
      currentLobby,
      user,
      onHostLobby,
      onJoinLobby,
      onLeaveLobby,
      onSelectDeck,
      onReady,
      onStartMatch,
      onSelectColor,
    ]
  );

  return (
    <GameBrowserContext.Provider value={value}>{children}</GameBrowserContext.Provider>
  );
};

export default GameBrowserContext;
