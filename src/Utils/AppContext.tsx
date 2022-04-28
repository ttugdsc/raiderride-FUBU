import {createContext} from 'react';
import {GlobalContext} from '../App';

/**
 * This is the default values passed to the context.
 * They're redefined in App.tsx, so if we see these values in
 * the app itself then it's likely an error.
 */
const def: GlobalContext = {
  userData: {
    name: 'ERROR:DEF_VALUE',
  },
  setUserData: () => {
    console.warn(
      "AppContext is using it's default value. This is likely an error.",
    );
  },
};

/**
 * This is the global state context.
 */
const AppContext = createContext<GlobalContext>(def);

export default AppContext;
