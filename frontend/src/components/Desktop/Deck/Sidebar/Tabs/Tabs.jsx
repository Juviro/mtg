import React, { useContext } from 'react';
import styled from 'styled-components';

import Tab from './Tab';
import { useShortcut } from '../../../../Hooks';
import FocusContext from '../../../../Provider/FocusProvider/FocusProvider';

const StyledWrapper = styled.div`
  margin-right: 8px;
  user-select: none;
  height: fit-content;
  position: absolute;
  right: -49px;
`;

export default ({ currentTab, setCurrentTab }) => {
  const { focusedElements, setFocus } = useContext(FocusContext);
  const tabs = [
    {
      title: 'Search [S]',
      key: 'add',
      shortcut: 's',
    },
    {
      title: 'Wants [W]',
      key: 'wants',
      shortcut: 'w',
    },
    // {
    //   title: 'Insights [I]',
    //   key: 'stats',
    //   shortcut: 'i',
    // },
  ];

  const focusIds = ['deck.sidebar.add', 'deck.sidebar.wants', 'deck.sidebar.stats'];

  const onOpenTab = (key) => {
    const filteredFocus = focusedElements.filter(
      (focusId) => !focusIds.includes(focusId)
    );

    if (key === currentTab) {
      setCurrentTab(null);
      setFocus(filteredFocus);
    } else {
      setCurrentTab(key);
      setFocus(filteredFocus.concat(`deck.sidebar.${key}`));
    }
  };

  tabs.forEach(({ key, shortcut }) => {
    useShortcut(shortcut, () => onOpenTab(key), {
      focusId: focusIds.concat('deck.cards'),
    });
  });

  return (
    <StyledWrapper>
      {tabs.map(({ title, key }, index) => (
        <Tab
          index={index}
          key={key}
          title={title}
          active={key === currentTab}
          onClick={() => onOpenTab(key)}
        />
      ))}
    </StyledWrapper>
  );
};
