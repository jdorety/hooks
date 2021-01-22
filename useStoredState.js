/**
 *
 * @param {string} storageKey
 * @param {any} defaultValue
 * @returns {[any, (value: any) => void]} state variable and setState function
 */
function useSavedState(storageKey, defaultValue = undefined) {
  const storedState = localStorage.getItem(storageKey);
  let notString;
  try {
    notString = storedState && JSON.parse(storedState);
  } catch {
    notString = storedState;
  }
  const [state, setState] = useState(notString || defaultValue);

  useEffect(() => {
    const storedData = localStorage.getItem(storageKey);

    if (storedData !== state) {
      localStorage.setItem(
        storageKey,
        state && state.length && state.length > 5000
          ? "// Values greater than 5k are not saved in local storage."
          : state
      );
    }
  }, [state]);
  return [state, setState];
}
