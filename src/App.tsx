/**
 * @fileoverview Contains the main component for the app.
 */

/* ------------------------------ React Imports ----------------------------- */
import React, {useState} from 'react';
import Config from 'react-native-config';
import AppContext from './Utils/AppContext';

/* ------------------------ React Navigation Imports ------------------------ */
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

/* ------------------------------ Style Imports ----------------------------- */
import * as eva from '@eva-design/eva';
import {ApplicationProvider} from '@ui-kitten/components';
import {raiderRideTheme} from './Styles/ui-kitten-theme';

/* ------------------------------ Page Imports ------------------------------ */
import Home from './Components/Home';

/**
 * This is the main navigation stack for the app.
 */
const Stack = createNativeStackNavigator();

/**
 * Represents user data. We should update this once the backend returns user
 * data to us.
 * @type
 */
export type UserData = {
  name: string;
};

/**
 * This strictly defines the type of data stored in our global state.
 * @remarks This should be updated anytime we add a value to our global state.
 * @type
 */
export type GlobalContext = {
  /**
   * The data for the user. (This will likely come from the backend.)
   */
  userData: UserData;
  /**
   * The hook to set the user data state.
   */
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
};

/**
 * Edit this value to set default user data settings.
 * Once we have more backend this we can create a type to match
 * this object.
 */
let defaultSettings: UserData = {
  name: 'UNDEFINED',
};

//For dev builds we can set some defaults that are prettier to look at.
if (Config.MODE !== 'prod') {
  defaultSettings = {
    name: 'John',
  };
}

/**
 * The root component for the entire app. Mainly used to store navigation, but
 * could be used to store authentication state.
 * @component
 * @
 */
const App = () => {
  /* ------------------------- Global State Variables ------------------------- */
  const [userData, setUserData] = useState<UserData>(defaultSettings);
  /* -------------------------------------------------------------------------- */

  return (
    <AppContext.Provider value={{userData: userData, setUserData}}>
      <ApplicationProvider {...eva} theme={{...eva.light, ...raiderRideTheme}}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{headerShown: false}}>
            <Stack.Screen name="Home" component={Home} />
          </Stack.Navigator>
        </NavigationContainer>
      </ApplicationProvider>
    </AppContext.Provider>
  );
};

export default App;
