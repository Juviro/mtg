import { Space } from 'antd';
import MultiInput from 'components/Elements/Desktop/AddCards/MultIinput';
import UserContext from 'components/Provider/UserProvider';
import React, { useContext } from 'react';
import {
  ProxyCards,
  ExportAsText,
  Menu,
  WantsListVisibility,
} from '../../../Elements/Shared';
import DeleteList from './DeleteList';
import DuplicateList from './DuplicateList';
import UnlinkDeck from './UnlinkDeck';

export default ({ wantsList, onAddCards, canEdit }) => {
  if (!wantsList) return null;
  const { user } = useContext(UserContext);

  const canUnlink = wantsList.deck && canEdit;
  const baseActions = [
    <ExportAsText title={wantsList.name} cards={wantsList.cards} />,
    <ProxyCards id={wantsList.id} type="wants" />,
  ];

  const loggedInActions = [<DuplicateList id={wantsList.id} />];

  const editActions = [
    <MultiInput onAddCards={onAddCards} buttonProps={{ type: 'link' }} />,
    <DeleteList wantsList={wantsList} />,
  ];

  const unlinkAction = <UnlinkDeck id={wantsList.id} />;

  const actions = baseActions;
  if (canUnlink) actions.push(unlinkAction);
  if (user) actions.push(...loggedInActions);
  if (canEdit) actions.push(...editActions);

  return (
    <Space>
      {wantsList.canEdit && <WantsListVisibility visibility={wantsList.visibility} />}
      <Menu actions={actions} placement="bottomRight" />
    </Space>
  );
};
