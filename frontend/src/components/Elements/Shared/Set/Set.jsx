import React, { useContext } from 'react';

import styled from 'styled-components';
import { Link } from 'react-router-dom';
import CardContext from '../../../CardProvider/CardProvider';
import getDynamicUrl from '../../../../utils/getDynamicUrl';

const StyledSetIcon = styled.img`
  height: 16px;
  width: 16px;
  margin-right: 4px;
`;

const StyledSetName = styled.div`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  @media (max-width: 764px) {
    font-size: 12px;
  }
`;

export default ({ setKey, name: overwriteName }) => {
  const { sets } = useContext(CardContext);
  const { name, icon_svg_uri } = sets[setKey];
  const setName = overwriteName || name;
  const to = getDynamicUrl(
    `/search?set=${setKey}&orderBy=price-desc&autoSearch=true`
  );
  return (
    <>
      <StyledSetName>
        <StyledSetIcon src={icon_svg_uri} alt={setName} />
        <Link to={to} onClick={e => e.stopPropagation()} tabIndex="-1">
          {setName}
        </Link>
      </StyledSetName>
    </>
  );
};
