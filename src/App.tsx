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
  authData: AuthData;
  authManager: AuthManager;
};

export type AuthData = {
  isLoading: boolean;
  isSignout: boolean;
  userToken: string | null;
};

/**
 * A response from calling the /token endpoint from
 * the Microsoft OAuth2 api.
 *
 * @interface
 */
interface TokenResponse {
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
  signIn: (navigation: NavigationProp<any, any>) => void;
  /**
   * Sign out of the application. This function is not async.
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

if (__DEV__) {
  const DevMenu = require('react-native-dev-menu');
  DevMenu.addItem('Clear Auth Storage', () => {
    authStorage.clearAll();
  });
}

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

const saveUserData = (userData: UserData): void => {
  authStorage.set('firstName', userData.name);
};

/**
 * The root component for the entire app. Mainly used to store navigation, but
 * could be used to store authentication state.
 * @component
 * @
 */
const App = () => {
  /* ------------------------- Global State Variables ------------------------- */
  const [userData, setUserData] = useState<UserData>(loadSavedUserData());
  /* -------------------------------------------------------------------------- */

  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
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

  useEffect(() => {
    const tryRefresh = async () => {
      let refreshToken: string | undefined;
      let accessToken: string | undefined;
      try {
        let expiresIn = authStorage.getString('tokenExpires');
        let expiresDate = moment(expiresIn);
        if (
          expiresIn !== undefined &&
          moment().subtract(5, 'minutes').isAfter(expiresDate)
        ) {
          refreshToken = authStorage.getString('refreshToken');
          if (refreshToken !== undefined) {
            console.info(
              'AUTH MANAGER: Access token expired, attempting to use refresh token.',
            );
            let refreshParams = new URLSearchParams();
            refreshParams.append(
              'client_id',
              'fc0978bf-d586-4d85-8933-5cea1cdd8ecf',
            );
            refreshParams.append('refresh_token', refreshToken as string);
            refreshParams.append('grant_type', 'refresh_token');

            let response = await axios.post(
              'https://login.microsoftonline.com/178a51bf-8b20-49ff-b655-56245d5c173c/oauth2/v2.0/token/',
              refreshParams,
              {
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded',
                },
              },
            );

            authStorage.set('refreshToken', response.data.refresh_token);
            authStorage.set('accessToken', response.data.access_token);
            authStorage.set(
              'tokenExpires',
              moment().add(response.data.expires_in, 'seconds').toString(),
            );
            accessToken = response.data.access_token;
          }
        } else {
          console.info('AUTH MANAGER: Access token is still valid - restoring');
          accessToken = authStorage.getString('accessToken');
        }
      } catch (e: AxiosError | any) {
        console.info('Could not restore refresh token.');
        console.error(e.response?.data);
      }

      if (accessToken === undefined) {
        dispatch({type: 'RESTORE', token: null});
      } else {
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
        });

        saveUserData({
          name: graphResponse.data.givenName,
        });

        dispatch({type: 'RESTORE', token: accessToken});
      }
    };
    tryRefresh();
  }, []);

  const authManager = React.useMemo(() => {
    return {
      signIn: () => {
        Linking.addEventListener('url', data => {
          Linking.removeAllListeners('url');

          const returnURL = new URL(data.url);
          if (returnURL.searchParams.get('error') === null) {
            Alert.alert(
              'Successful Authentication',
              'Recieved successful authentication code.',
            );

            axios
              .post(
                'https://login.microsoftonline.com/178a51bf-8b20-49ff-b655-56245d5c173c/oauth2/v2.0/token/',
                qs.stringify({
                  client_id: 'fc0978bf-d586-4d85-8933-5cea1cdd8ecf',
                  code: returnURL.searchParams.get('code'),
                  redirect_uri: 'raiderride://auth',
                  scope: 'offline_access https://graph.microsoft.com/User.Read',
                  grant_type: 'authorization_code',
                }),
                {
                  headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                  },
                },
              )
              .then(response => {
                console.info('Recieved Refresh Token from Microsoft OAuth');
                let res: TokenResponse = response.data;

                authStorage.set('refreshToken', res.refresh_token);
                console.log(res.refresh_token);
                authStorage.set('accessToken', res.access_token);
                authStorage.set(
                  'tokenExpires',
                  moment().add(res.expires_in, 'seconds').toString(),
                );
                axios
                  .get('https://graph.microsoft.com/v1.0/me', {
                    headers: {
                      Authorization: `Bearer ${res.access_token}`,
                    },
                  })
                  .then(graphResponse => {
                    setUserData({
                      name: graphResponse.data.givenName,
                    });
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
