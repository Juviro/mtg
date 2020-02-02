import React from 'react';
import styled from 'styled-components';
import { Checkbox } from 'antd';
import { colors as colorIcons } from '../../../assets/icons';

const colors = [
  {
    letter: 'w',
    key: 'W',
  },
  {
    letter: 'u',
    key: 'U',
  },
  {
    letter: 'b',
    key: 'B',
  },
  {
    letter: 'r',
    key: 'R',
  },
  {
    letter: 'g',
    key: 'G',
  },
];

const addColor = (currentColors, newColor) => {
  if (!currentColors) return newColor;
  const findColorIndex = colorLetter => colors.findIndex(({ letter }) => letter === colorLetter);

  return currentColors
    .concat(newColor)
    .split('')
    .sort((a, b) => findColorIndex(a) - findColorIndex(b))
    .join('');
};

const ColorSelectionWrapper = styled.div`
  width: 110%;
  display: flex;
  margin-top: 20px;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

const getColorTagProps = invert => ({ isSelected }) => {
  const showSelectedStyle = invert ? !isSelected : isSelected;
  return showSelectedStyle
    ? `
        border: 2px solid #b37c00;
        filter: none;
      `
    : `
        border: 1px solid #333333;
        filter: grayscale(100%);
        opacity: 0.5;
      `;
};

const StyledColorTag = styled.img`
  width: 25px;
  height: 25px;
  cursor: pointer;
  border-radius: 50%;
  ${getColorTagProps(false)}

  &:active {
    ${getColorTagProps(true)}
  }
`;

export default ({ onSetColors, selectedColors = '' }) => {
  const isColorSelected = letter => selectedColors && selectedColors.includes(letter);
  const onSelectColor = letter => {
    const isSelected = isColorSelected(letter);
    const newColors = isSelected ? selectedColors.replace(letter, '') : addColor(selectedColors, letter);
    onSetColors(newColors);
  };
  const onSetExcluded = symbol => e => {
    const isExclude = e.target.checked;
    const withoutSymbol = selectedColors.replace(new RegExp(symbol, 'g'), '');
    const newColors = isExclude ? symbol.concat(withoutSymbol) : withoutSymbol;
    onSetColors(newColors);
  };

  return (
    <ColorSelectionWrapper>
      {colors.map(({ letter, key }) => (
        <StyledColorTag
          key={key}
          src={colorIcons[key]}
          isSelected={isColorSelected(letter)}
          onClick={() => onSelectColor(letter)}
        />
      ))}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Checkbox
          style={{
            fontSize: '10px',
            width: '120px',
            display: 'flex',
            alignItems: 'center',
            marginLeft: 8,
            marginBottom: 5,
          }}
          disabled={selectedColors.includes('x')}
          checked={selectedColors.includes('-')}
          onChange={onSetExcluded('-')}
        >
          Exclude others
        </Checkbox>
        <Checkbox
          style={{
            fontSize: '10px',
            width: '120px',
            display: 'flex',
            alignItems: 'center',
            marginRight: '0',
          }}
          checked={selectedColors.includes('x')}
          onChange={onSetExcluded('x')}
        >
          Exact match
        </Checkbox>
      </div>
    </ColorSelectionWrapper>
  );
};
