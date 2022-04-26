/**
 * @fileoverview Contains the main component for the app.
 * @format
 */

/* ------------------------------ React Imports ----------------------------- */
import React from 'react';

/* ------------------------ React Navigation Imports ------------------------ */
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

/* ------------------------------ Style Imports ----------------------------- */
import * as eva from '@eva-design/eva';
import {ApplicationProvider} from '@ui-kitten/components';

/* ---------------------------- Component Imports --------------------------- */
import Home from './Components/Home';
import {raiderRideTheme} from './Styles/ui-kitten-theme';

/**
 * This is the main navigation stack for the app.
 */
const Stack = createNativeStackNavigator();

/**
 * The root component for the entire app. Mainly used to store navigation, but
 * could be used to store authentication state.
 */
const App = () => {
  return (
    <ApplicationProvider {...eva} theme={{...eva.light, ...raiderRideTheme}}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{headerShown: false}}>
          <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
      </NavigationContainer>
    </ApplicationProvider>
  );
};

export default App;
