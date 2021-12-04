import React, { useContext } from 'react';
import { Spin, Typography } from 'antd';
import styled from 'styled-components';

import { LoginButton } from 'components/Elements/Shared/Login';

import UserContext from 'components/Provider/UserProvider';
import Flex from '../Flex';

const StyledWrapper = styled.div`
  height: 30px;
  display: flex;
  align-items: center;

  @media only screen and (max-width: 1200px) {
    & .username {
      display: none;
    }
  }
`;

const StyledAvatar = styled.img`
  height: 100%;
  border-radius: 50%;
  cursor: pointer;
  font-size: 8px;
`;

export default ({ textPosition, onClick, textColor }) => {
  const { user, loading } = useContext(UserContext);
  if (loading) return null;

  if (!user) {
    return <LoginButton />;
  }

  const username = user.username ?? user.name;

  return (
    <StyledWrapper onClick={onClick}>
      {loading ? (
        <Spin />
      ) : (
        <>
          {textPosition === 'left' && (
            <Typography.Text
              ellipsis
              className="username"
              style={{
                color: textColor,
                fontSize: 16,
                marginRight: 8,
                maxWidth: 100,
              }}
            >
              {username}
            </Typography.Text>
          )}
          <StyledAvatar src={user.avatar} alt="avatar" />
          {textPosition === 'right' && (
            <Flex
              direction="column"
              style={{ marginLeft: 16, maxWidth: 190, minWidth: 100 }}
            >
              <Typography.Text
                type="secondary"
                style={{ fontSize: 12, color: textColor }}
              >
                Logged in as
              </Typography.Text>
              <Typography.Text
                ellipsis
                style={{ color: textColor, lineHeight: 1, fontSize: 16 }}
              >
                {username}
              </Typography.Text>
            </Flex>
          )}
        </>
      )}
    </StyledWrapper>
  );
};
