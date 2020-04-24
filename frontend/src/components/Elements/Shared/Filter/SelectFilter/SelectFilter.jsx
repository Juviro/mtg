import React, { useState, useEffect } from 'react';

import { AutoComplete } from 'antd';
import CustomSkeleton from '../../CustomSkeleton';

const SelectFilter = ({ onChange, options, placeholder, value = '' }) => {
  const inputRef = React.useRef(null);
  const unifiedOptions = options.map(option => {
    if (option.value) return option;
    return {
      value: option,
      name: option,
    };
  });
  const [currentValue, setCurrentValue] = useState('');

  useEffect(() => {
    const newValue = unifiedOptions.find(
      ({ value: optionValue }) => value === optionValue
    );
    if (!newValue) return;
    setCurrentValue(newValue.name);
    // eslint-disable-next-line
  }, [value]);

  const filteredOptions = unifiedOptions
    .filter(({ name }) =>
      name.toLowerCase().startsWith(currentValue.toLowerCase())
    )
    .map(({ name, value: optionValue }) => (
      <AutoComplete.Option value={optionValue} key={optionValue}>
        {name}
      </AutoComplete.Option>
    ));

  const onChangeInput = (inputValue = '') => {
    if (!inputValue) onChange('');
    setCurrentValue(inputValue);
    const isValidOption = unifiedOptions.find(
      ({ name }) => name.toLowerCase() === inputValue.toLowerCase()
    );
    if (isValidOption) {
      onChange(isValidOption.value);
    }
  };

  const onSelect = (_, { key, children: optionValue }) => {
    onChange(key);
    setCurrentValue(optionValue);
    setTimeout(() => inputRef.current.blur(), 100);
  };

  // reset current input when parent is reset
  useEffect(() => {
    if (value) return;
    setCurrentValue('');
  }, [value]);

  return (
    <AutoComplete
      allowClear
      size="small"
      value={currentValue}
      ref={inputRef}
      style={{ width: '100%' }}
      placeholder={placeholder}
      onSelect={onSelect}
      onChange={onChangeInput}
    >
      {filteredOptions}
    </AutoComplete>
  );
};

// Wrap around loader so default value is set correctly
// even if options are not loaded from provider yet
export default ({ onChange, options, placeholder, value }) => {
  if (!options.length) return <CustomSkeleton.Line />;

  return (
    <SelectFilter
      options={options}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
};
