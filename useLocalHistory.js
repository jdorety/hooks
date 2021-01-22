// import { useState, useEffect } from "react";

/**
 * Provides a state variable consisting of an array of objects
 * Will not add consecutive duplicate items
 * @param {string} storageKey 
 * @returns {[Array, (value: object) => void]} state variable and setState function
 */
function useLocalHistory(storageKey) {
  const storedState = localStorage.getItem(storageKey);
  const [state, setState] = useState(
    storedState ? JSON.parse(storedState) : []
  );

  useEffect(() => {
    const storedData = localStorage.getItem(storageKey);

    if (storedData !== JSON.stringify(state))
      localStorage.setItem(storageKey, JSON.stringify(state));
  }, [state]);
  return [state, setState];
}
