import { useState } from 'react';

export default (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    const item = window.localStorage.getItem(key);
    try {
      return JSON.parse(item) || initialValue;
    } catch {
      return item || initialValue;
    }
  });

  const setValue = value => {
    window.localStorage.setItem(key, value);
    setStoredValue(value);
  };

  return [storedValue, setValue];
};