import React from 'react';
import styled from 'styled-components';
import MythicCommanderBanner from 'components/Elements/Shared/MythicCommanderBanner';
import Flex from 'components/Elements/Shared/Flex';
import SearchBar from 'components/Elements/Shared/SearchBar';
import { CLASH_BASE_URL } from 'constants/network';
import { Space } from 'antd';
import {
  clashPrimary,
  clashPrimaryLight,
  darkBackground,
  darkBackgroundLight,
} from '../../../constants/colors';
import UserMenu from './UserMenu';
import Navigation from './Navigation';
import { ReactComponent as ExternalIcon } from '../../../assets/icons/arrow-right-top.svg';

const StyledMenu = styled.div`
  width: 100%;
  top: 0;
  z-index: 100;
  display: flex;
  position: fixed;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(138deg, ${darkBackground} 0%, ${darkBackgroundLight} 100%);
  background-color: ${darkBackgroundLight};

  & .ant-menu-overflowed-submenu {
    background: transparent;
  }
  & .ant-menu {
    background: transparent;
  }
`;

const StyledPlayButton = styled.a`
  color: ${clashPrimary};
  font-weight: bold;
  text-decoration: none;
  margin: 0 16px;
  font-size: 22px;
  display: flex;
  align-items: end;

  &:hover {
    color: ${clashPrimaryLight};
  }
`;

const StyledExternalIcon = styled(ExternalIcon)`
  height: 22px;
  width: 22px;
`;

const Menu = () => {
  return (
    <StyledMenu>
      <Flex
        direction="row"
        align="center"
        justify="space-between"
        style={{ width: '100%' }}
      >
        <Flex direction="row" align="center">
          <MythicCommanderBanner
            style={{ marginLeft: 8 }}
            showCollectionOnClick
            hideWhenSmall
          />
          <Navigation />
          <StyledPlayButton href={CLASH_BASE_URL} target="_blank" rel="noreferrer">
            Play
            <StyledExternalIcon />
          </StyledPlayButton>
        </Flex>
        <SearchBar
          hideLayover
          style={{ margin: '0 16px', width: '100%', maxWidth: 330 }}
        />
        <Space>
          <UserMenu />
        </Space>
      </Flex>
    </StyledMenu>
  );
};

export default Menu;
