/**
 * @fileoverview Contains the main component for the app.
 */

/* ------------------------------ React Imports ----------------------------- */
import React, {useEffect, useState} from 'react';
import Config from 'react-native-config';
import AppContext from './Utils/AppContext';

/* ------------------------ React Navigation Imports ------------------------ */
import {NavigationContainer, NavigationProp} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

/* ------------------------------ Style Imports ----------------------------- */
import * as eva from '@eva-design/eva';
import {
  ApplicationProvider,
  Layout,
  Spinner,
  Text,
} from '@ui-kitten/components';
import {raiderRideTheme} from './Styles/ui-kitten-theme';

/* ------------------------------ Page Imports ------------------------------ */
import Home from './Components/Home';
import Login, {LoginProps} from './Components/Login';
import {Alert, Linking, View} from 'react-native';

/* --------------------------- Networking Imports --------------------------- */
import axios, {AxiosError} from 'axios';
import qs from 'qs';
import {URL, URLSearchParams} from 'react-native-url-polyfill';
import {authStorage} from './Utils/Storage';
import moment from 'moment';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AuthHandler} from './Utils/AuthRequests';

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
  /**
   * The authentication reducer state.
   */
  authData: AuthData;
  /**
   * Used to change the state of the authentication instead of directly calling
   * the reducer dispatch
   *
   * See {@linkcode AuthManager} for more details
   */
  authManager: AuthManager;
};

/**
 * The data stored in authData value of the GlobalContext
 */
export type AuthData = {
  isLoading: boolean;
  isSignout: boolean;
  userToken: string | null;
};

const authHandler = new AuthHandler();

/**
 * A response from calling the /token endpoint from
 * the Microsoft OAuth2 api.
 *
 * @interface
 */
export interface TokenResponse {
  /**
   * The access token for calling the API.
   */
  access_token: string;
  /**
   * The token type, should be 'Bearer'
   */
  token_type: 'Bearer' | string;
  /**
   * How long (in seconds) until the Token expires.
   */
  expires_in: number;
  /**
   * The scopes the token is valid for.
   */
  scope: string;
  /**
   * The refresh token that can used to log in the user.
   */
  refresh_token: string;
}

/**
 * Used to manage the authentication state as part of the global state.
 */
export type AuthManager = {
  /**
   * Sign the user into the application using Microsoft OAuth2
   *
   * @example
   * You should this function like so:
   * ```javascript
   * globalState.authManager.signIn()
   * ```
   */
  signIn: () => void;
  /**
   * Sign out of the application.
   *
   */
  signOut: () => void;
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
 * Basically, this is used to add a button that clears the authStorage object
 * for debug purposes.
 */
if (__DEV__) {
  const DevMenu = require('react-native-dev-menu');
  DevMenu.addItem('Clear Auth Storage', () => {
    authStorage.clearAll();
  });
}

/**
 * Loads the user data that is currently in persistent state.
 * @returns {UserData} The UserData loaded from the persistent state.
 */
const loadSavedUserData = (): UserData => {
  let firstName: string = '';
  if (authStorage.contains('firstName')) {
    // it's safe to cast this.
    firstName = authStorage.getString('firstName') as string;
  }

  return {
    name: firstName,
  };
};

/**
 * Stores a value into the persistant state.
 * @param userData The data to store
 */
const saveUserData = (userData: UserData): void => {
  authStorage.set('firstName', userData.name);
};

/**
 * This represents a possible action for the authetication reducer.
 * It's mainly used to type check the reducer.
 */
type Action =
  | {type: 'RESTORE'; token: string | null}
  | {type: 'SIGN_IN'; token: string | null}
  | {type: 'SIGN_OUT'};

/**
 * The root component for the entire app. Mainly used to store navigation, but
 * could be used to store authentication state.
 * @component App
 */
const App = () => {
  /* ------------------------- Global State Variables ------------------------- */
  const [userData, setUserData] = useState<UserData>(loadSavedUserData());
  /* -------------------------------------------------------------------------- */

  const [state, dispatch] = React.useReducer(
    (prevState: AuthData, action: Action): AuthData => {
      switch (action.type) {
        case 'RESTORE':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    },
  );

  /**
   * This useEffect is the inital bootstrap for the application.
   * It's primary job is to check the status of the refresh token or access token.
   */
  useEffect(() => {
    const tryRefresh = async () => {
      /**
       * Represents our refresh token. This can, and will be undefined at times.
       */
      let refreshToken: string | undefined;
      /**
       * Represents our access token, the definition of this token is very important,
       * and if it remains undefined after the try block it will dispatch null as the token value.
       */
      let accessToken: string | undefined;
      try {
        let expiresIn = authStorage.getString('tokenExpires'); // This should be set if we have a refresh token.
        let expiresDate = moment(expiresIn); // Convert it to a moment object.
        if (
          expiresIn !== undefined &&
          moment().subtract(5, 'minutes').isAfter(expiresDate) // If the access token is expired or will expire shortly
        ) {
          refreshToken = authStorage.getString('refreshToken'); // Get our refresh token from our storage
          if (refreshToken !== undefined) {
            //If the refresh token is set:
            console.info(
              'AUTH MANAGER: Access token expired, attempting to use refresh token.',
            );
            // Create the API url:
            let refreshParams = new URLSearchParams();
            refreshParams.append(
              'client_id',
              'fc0978bf-d586-4d85-8933-5cea1cdd8ecf',
            );
            refreshParams.append('refresh_token', refreshToken as string);
            refreshParams.append('grant_type', 'refresh_token');

            // Request a new access token using our Refresh token:
            let response = await axios.post(
              'https://login.microsoftonline.com/178a51bf-8b20-49ff-b655-56245d5c173c/oauth2/v2.0/token/',
              refreshParams,
              {
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded',
                },
              },
            );

            authStorage.set('refreshToken', response.data.refresh_token); // Update our storage to contain the new tokens
            authStorage.set('accessToken', response.data.access_token); // Update our storage to contain the new token
            authStorage.set(
              'tokenExpires',
              moment().add(response.data.expires_in, 'seconds').toString(),
            ); // Update the expiration date

            accessToken = response.data.access_token; // Finally, set our access token:
          }
        } else {
          // This means that we can still use the last access token:
          console.info('AUTH MANAGER: Access token is still valid - restoring');
          accessToken = authStorage.getString('accessToken'); // Grab our stored access token;
        }
      } catch (e: AxiosError | any) {
        // Error Handling:
        console.info('Could not restore refresh token.');
        console.error(e.response?.data);
      }

      if (accessToken === undefined) {
        dispatch({type: 'RESTORE', token: null}); // If we didn't define the access token, we can go ahead and just dispatch it as null.
      } else {
        //This bit updates the data and serves as check to make sure that the access token works.
        let graphResponse = await axios.get(
          'https://graph.microsoft.com/v1.0/me',
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );

        setUserData({
          name: graphResponse.data.givenName,
        }); // Set the userData state

        saveUserData({
          name: graphResponse.data.givenName,
        }); // Persist the userData state

        dispatch({type: 'RESTORE', token: accessToken}); // Dispatch our auth reducer.
      }
    };
    tryRefresh();
  }, []);

  /**
   * This is the authManager used in the global state. It's wrapped in a useMemo hook for performance optimization reasons.
   *
   */
  const authManager: AuthManager = React.useMemo(() => {
    return {
      signIn: () => {
        // First things first, we need to remove all listeners for the deep link if they exist.
        Linking.removeAllListeners('url');

        //Now, we will add a new listener for our application URI, which is raiderride://
        Linking.addEventListener('url', data => {
          Linking.removeAllListeners('url'); // Clear the listener so it doesn't fire twice.

          const returnURL = new URL(data.url); // Create a URL object from the reponse.
          if (
            returnURL.hostname === 'auth' &&
            returnURL.searchParams.get('error') === null // If the url is at the right endpoint, and doesn't have the error query param.
          ) {
            // Send a request for an auth code.
            // returnURL.searchParams.get('code')

            authHandler
              .getAccessToken(returnURL.searchParams.get('code') as string)
              .then(res => {
                // If the response isn't an error:
                console.info('Recieved Refresh Token from Microsoft OAuth');

                authStorage.set('refreshToken', res.refresh_token); // Persist the refresh token.
                authStorage.set('accessToken', res.access_token); // Persist the access token.
                authStorage.set(
                  'tokenExpires',
                  moment().add(res.expires_in, 'seconds').toString(),
                ); // Convert the expiration time into a moment object.

                //Get the user data from the Graph API
                axios
                  .get('https://graph.microsoft.com/v1.0/me', {
                    headers: {
                      Authorization: `Bearer ${res.access_token}`,
                    },
                  })
                  .then(graphResponse => {
                    setUserData({
                      name: graphResponse.data.givenName,
                    }); // Set the state

                    saveUserData({
                      name: graphResponse.data.givenName,
                    }); // Persist the state
                  });

                dispatch({type: 'SIGN_IN', token: res.access_token});
              })
              .catch((err: AxiosError) => {
                console.error(err);
                console.log(err.response?.data);
                dispatch({type: 'SIGN_IN', token: null});
              });
          } else {
            Alert.alert(
              'Authentication Unsuccessful',
              `The following error was given:\n${returnURL.searchParams.get(
                'error',
              )}`,
            );
          }
        });
        Linking.openURL(
          'https://login.microsoftonline.com/178a51bf-8b20-49ff-b655-56245d5c173c/oauth2/v2.0/authorize?client_id=fc0978bf-d586-4d85-8933-5cea1cdd8ecf&response_type=code&redirect_uri=raiderride://auth&scope=https://graph.microsoft.com/User.Read',
        );
      },
      signOut: () => {
        dispatch({type: 'SIGN_OUT'});
      },
    };
  }, []);

  if (state.isLoading) {
    return (
      <ApplicationProvider {...eva} theme={{...eva.light, ...raiderRideTheme}}>
        <SafeAreaView
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: raiderRideTheme['color-primary-500'],
          }}>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Spinner status={'basic'} size="giant" />
            <Text
              style={{marginTop: 20}}
              appearance={'alternative'}
              category={'h5'}>
              Loading RaiderRide
            </Text>
          </View>
        </SafeAreaView>
      </ApplicationProvider>
    );
  }

  return (
    <AppContext.Provider
      value={{
        userData: userData,
        setUserData,
        authData: state,
        authManager: authManager,
      }}>
      <ApplicationProvider {...eva} theme={{...eva.light, ...raiderRideTheme}}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{headerShown: false}}>
            {state.userToken === null ? (
              <Stack.Screen name="Login" component={Login} />
            ) : (
              <Stack.Screen name="Home" component={Home} />
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </ApplicationProvider>
    </AppContext.Provider>
  );
};

export default App;
