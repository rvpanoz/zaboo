import { useState } from "react";

function useLocalStorage(key, initialValue) {
  // pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // get from local storage by key
      const item = window.localStorage.getItem(key);

      // parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // if error also return initialValue
      console.log(error);
      return initialValue;
    }
  });

  // return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = value => {
    try {
      // allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // save state
      setStoredValue(valueToStore);
      // save to local storage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      // a more advanced implementation would handle the error case
      console.log(error);
    }
  };

  return [storedValue, setValue];
}

export default useLocalStorage;
