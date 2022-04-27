/**
 * @fileoverview The rider home screen component
 */

/* ------------------------------ React Imports ----------------------------- */
import React, {useContext, useEffect, useState} from 'react';
import {
  Alert,
  Dimensions,
  Keyboard,
  KeyboardEventName,
  Platform,
  StatusBar,
  StyleSheet,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Config from 'react-native-config';

/* ------------------------------ UIKitten Imports ------------------------------ */
import style from '../Styles/style';
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Divider,
  Layout,
  Text,
} from '@ui-kitten/components';

/* ---------------------------- Component Imports --------------------------- */
import RaiderRideHeader from './Common/RaiderRideHeader';
import size from '../Utils/Size';

/* ------------------------------- Map Imports ------------------------------ */
import MapboxGL from '@rnmapbox/maps';
import Geolocation from 'react-native-geolocation-service';

/* ----------------------- Radar Autocomplete Imports ---------------------- */
import axios from 'axios';
import {RadarAddress} from '../Utils/RadarTypes';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faBook,
  faEye,
  faIdCard,
  faLocationPin,
} from '@fortawesome/free-solid-svg-icons';
import {raiderRideTheme} from '../Styles/ui-kitten-theme';
import AppContext from '../Utils/AppContext';
import {GlobalContext, UserData} from '../App';

/* ---------------------------- Global Constants ---------------------------- */
const RADAR_API = 'https://api.radar.io/v1';
const {height} = Dimensions.get('screen');

// This is needed for android.
if (Platform.OS === 'android') {
  MapboxGL.setAccessToken(null);
  MapboxGL.setConnected(true);
}

const showEvent = Platform.select({
  android: 'keyboardDidShow',
  default: 'keyboardWillShow',
});

const hideEvent = Platform.select({
  android: 'keyboardDidHide',
  default: 'keyboardWillHide',
});

/**
 * Styles only used on the home page.
 * There are more commonly used styles in the style.ts file
 */
const homeStyle = StyleSheet.create({
  overlayBottom: {
    position: 'absolute',
    bottom: Platform.OS === 'android' ? size(-10) : 0,
    left: 0,
    height:
      Platform.OS === 'android'
        ? height - size(200) - size(100)
        : height - size(270) + size(10),
    width: '100%',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 5,
    padding: 20,
  },
  rulesContainer: {
    marginVertical: size(8),
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 10,
  },
  innerContent: {flex: 1},
});

/**
 * Component for the driver home page.
 * @component
 */
const Home = () => {
  const [update, setUpdate] = useState(true);
  /**
   * This is the global state from the context provider.
   */
  const globalState: GlobalContext = useContext<GlobalContext>(AppContext);

  /* ------------------------------ Autocomplete States ------------------------------ */
  const [pickupDisplay, setPickupDisplay] = useState({
    text: '',
    startAutocomplete: false,
  });
  const [pickupSuggestions, setPickupSuggestions] = useState<RadarAddress[]>(
    [],
  );

  const [dropoffDisplay, setDropoffDisplay] = useState({
    text: '',
    startAutocomplete: false,
  });
  const [dropoffSuggestions, setDropoffSuggestions] = useState<RadarAddress[]>(
    [],
  );

  /**
   * This is used to set the placement of the popovers on the autocomplete elements.
   */
  const [placement, setPlacement] = useState('bottom');

  /**
   * This is part of the keyboard avoidance logic
   * for the autocomplete inputs. Which need their placement
   * prop set to 'top' once the keyboard is shown.
   */
  useEffect(() => {
    const keyboardShowListener = Keyboard.addListener(
      showEvent as KeyboardEventName,
      () => {
        setPlacement('top');
      },
    );

    const keyboardHideListener = Keyboard.addListener(
      hideEvent as KeyboardEventName,
      () => {
        setPlacement('bottom');
      },
    );

    /**
     * When you return from a use effect hook, it acts as a cleanup function.
     * Basically the equivalent to Component will Unmount.
     */
    return () => {
      keyboardShowListener.remove();
      keyboardHideListener.remove();
    };
  });

  /**
   * If the rate limit header is low, we'll wait 1 second before updating results.
   */
  const [rateLimit, setRateLimit] = useState(false);

  /**
   * This is used to store the selected value of the pickup autocomplete.
   */
  const [pickupLocation, setPickup] = useState<RadarAddress | null>(null);
  /**
   * This is used to store the selected value of the dropoff autocomplete.
   */
  const [dropoffLocation, setDropoff] = useState<RadarAddress | null>(null);

  useEffect(() => {
    if (Platform.OS === 'android') {
      MapboxGL.requestAndroidLocationPermissions();
    }

    MapboxGL.locationManager.start();

    return () => {
      MapboxGL.locationManager.stop();
    };
  }, []);

  useEffect(() => {
    if (
      (Config.RADAR_API_KEY === '' ||
        Config.RADAR_API_KEY === 'REPLACE_ME' ||
        Config.RADAR_API_KEY === undefined) &&
      Config.MODE !== 'PROD'
    ) {
      Alert.alert(
        'Dev Error: No Radar API Key',
        'You must set a key for the radar API in a .env file in the project root. See the github for documentation.',
      );
    }
  }, []);

  /**
   * A 1 second timer to deal with potential rate limit issues should they arrive.
   * @returns A promise to allow execution to continue.
   */
  const rateLimitTimer = async () => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve('done');
      }, 1000);
    });
  };

  /**
   * The function called when someone types into the pickup location
   * NOTE: You will need a RADAR_API_KEY set in your .env file.
   * @param {string} query The query typed into the autocomplete input
   * @param {'input'|'dropoff'} input The autocomplete state to change.
   * @async
   */
  const onPlacePickerChange = async (
    query: {
      text: string;
      startAutocomplete: boolean;
    },
    input: 'pickup' | 'dropoff',
  ) => {
    if (query.text.trim() === '' || !query.startAutocomplete) {
      if (input === 'pickup') {
        setPickupSuggestions([
          {
            addressLabel: 'currentLocation_debug',
          } as RadarAddress,
        ]);
      }
      return; //Make sure this isn't blank.
    }
    if (rateLimit) {
      const timer = await rateLimitTimer();
      console.assert(timer === 'done', 'Timer error.');
      setRateLimit(false);
    }

    const requestURL = `${RADAR_API}/search/autocomplete?query=${query.text.trim()}&limit=5&layers=place`;

    try {
      const result = await axios.get(requestURL, {
        headers: {
          Authorization: Config.RADAR_API_KEY,
        },
      });

      if (result) {
        const addresses: RadarAddress[] = result.data.addresses;
        if (Number(result.headers['x-ratelimit-remaining']) <= 3) {
          console.log('RATE LIMIT IN EFFECT.');
          setRateLimit(true);
        }

        if (input === 'pickup') {
          addresses.unshift({
            addressLabel: 'currentLocation_debug',
          } as RadarAddress);
          setPickupSuggestions(addresses);
        } else {
          setDropoffSuggestions(addresses);
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  /**
   * This is part of the autocomplete implementation,
   * it's used to dynamically render autocomplete elements.
   * @param {RadarAddress} item The prediction to disply
   * @param {React.Key} index The required index for the item
   */
  const renderLocationSuggestion = (item: RadarAddress, index: number) => {
    if (item.addressLabel !== 'currentLocation_debug') {
      return (
        <AutocompleteItem
          key={index}
          title={`${item.placeLabel}\n${item.formattedAddress}`}
        />
      );
    } else {
      return <AutocompleteItem key={index} title={'Use Current Location'} />;
    }
  };

  return (
    <SafeAreaView style={style.container}>
      <StatusBar barStyle={'dark-content'} />
      <MapboxGL.MapView
        style={[
          StyleSheet.absoluteFillObject,
          {
            height: Platform.OS === 'android' ? size(240) : size(270),
          },
        ]}
        contentInset={[10, 10, 10, 10]}
        logoPosition={{bottom: Platform.OS === 'android' ? 15 : 5, left: 3}}
        attributionPosition={{
          bottom: Platform.OS === 'android' ? 15 : 5,
          right: 0,
        }}
        /* There is some weird behavior on IOS simulator involving rendering of vector tiles.
           The solution is to set a new tile set, but that is cumbersome, and should be done closer
           to release */
        styleURL={
          'https://tiles.basemaps.cartocdn.com/gl/positron-gl-style/style.json'
        }
        tintColor={raiderRideTheme['color-primary-500']}>
        <MapboxGL.UserLocation
          onUpdate={() => {
            if (Platform.OS === 'android') {
              setUpdate(true);
            }
          }}
          androidRenderMode={'normal'}
        />
        {pickupLocation?.geometry.coordinates !== undefined ? (
          <MapboxGL.MarkerView
            id={'1'}
            coordinate={pickupLocation.geometry.coordinates}>
            <FontAwesomeIcon
              icon={faLocationPin}
              color={raiderRideTheme['color-primary-500']}
            />
          </MapboxGL.MarkerView>
        ) : (
          <></>
        )}
        {dropoffLocation?.geometry.coordinates !== undefined ? (
          <MapboxGL.MarkerView
            id={'1'}
            coordinate={dropoffLocation.geometry.coordinates}>
            <FontAwesomeIcon
              icon={faLocationPin}
              color={raiderRideTheme['color-primary-600']}
            />
          </MapboxGL.MarkerView>
        ) : (
          <></>
        )}
        <MapboxGL.Camera
          defaultSettings={{
            centerCoordinate: [-111.8678, 40.2866],
            zoomLevel: 0,
          }}
          followUserMode="normal"
          followUserLocation={update}
        />
      </MapboxGL.MapView>
      <RaiderRideHeader />
      <Layout style={[homeStyle.overlayBottom]}>
        <Layout
          style={{
            justifyContent: 'center',
            marginVertical: Platform.OS === 'android' ? 3 : 10,
          }}>
          <Text category="h4">
            Hi {globalState.userData.name}, where are we heading today?
          </Text>
        </Layout>
        <Layout style={homeStyle.innerContent}>
          <Text style={style.label} category="label">
            Pickup Location
          </Text>
          <Autocomplete
            placeholder="Pickup Location"
            value={pickupDisplay.text}
            placement={placement}
            onSelect={index => {
              if (index === 0) {
                // This is the reverse geocoder in action.
                Geolocation.getCurrentPosition(
                  async pos => {
                    if (rateLimit) {
                      const timer = await rateLimitTimer();
                      console.assert(timer === 'done', 'Timer error.');
                      setRateLimit(false);
                    }

                    let result = await axios.get(
                      `${RADAR_API}/geocode/reverse?coordinates=${pos.coords.latitude},${pos.coords.longitude}&layers=place`,
                      {
                        headers: {
                          Authorization: Config.RADAR_API_KEY,
                        },
                      },
                    );
                    // Let's make sure we aren't exceding rate limits.
                    if (Number(result.headers['x-ratelimit-remaining']) <= 3) {
                      console.log('RATE LIMIT IN EFFECT.');
                      setRateLimit(true);
                    }
                    setPickup(result.data.addresses[0]);
                    setPickupDisplay({
                      text: result.data.addresses[0].placeLabel as string,
                      startAutocomplete: false,
                    });
                  },
                  err => {
                    console.error(err);
                    Alert.alert('Could not fetch current location.');
                  },
                  {enableHighAccuracy: true, timeout: 150, maximumAge: 10000},
                );
              } else {
                setPickup(pickupSuggestions[index]);
                setPickupDisplay({
                  text: pickupSuggestions[index].placeLabel!,
                  startAutocomplete: false,
                });
              }
              Keyboard.dismiss();
            }}
            onChangeText={text => {
              setPickupDisplay({
                text: text,
                startAutocomplete: text.trim() !== '',
              });
              onPlacePickerChange(pickupDisplay, 'pickup');
            }}>
            {pickupSuggestions.map(renderLocationSuggestion)}
          </Autocomplete>
          <Text style={[style.label, {marginTop: 20}]} category="label">
            Dropoff Location
          </Text>
          <Autocomplete
            placeholder="Dropoff Location"
            value={dropoffDisplay.text}
            placement={placement}
            onSelect={index => {
              setDropoff(dropoffSuggestions[index]);
              setDropoffDisplay({
                text: dropoffSuggestions[index].placeLabel!,
                startAutocomplete: false,
              });
              Keyboard.dismiss();
            }}
            onChangeText={text => {
              setDropoffDisplay({
                text: text,
                startAutocomplete: text.trim() !== '',
              });
              onPlacePickerChange(dropoffDisplay, 'dropoff');
            }}>
            {dropoffDisplay.startAutocomplete ? (
              dropoffSuggestions.map(renderLocationSuggestion)
            ) : (
              <></>
            )}
          </Autocomplete>

          <Divider style={style.dividerMargins} />

          <Layout style={{justifyContent: 'center', flex: 1}}>
            <Text category={'s1'}>Before you can ride you must:</Text>
            <Layout style={homeStyle.rulesContainer}>
              <FontAwesomeIcon
                icon={faIdCard}
                size={20}
                style={homeStyle.icon}
                color={raiderRideTheme['color-primary-500']}
              />
              <Text>Have your valid TTU Student ID</Text>
            </Layout>
            <Layout style={homeStyle.rulesContainer}>
              <FontAwesomeIcon
                icon={faBook}
                size={20}
                style={homeStyle.icon}
                color={raiderRideTheme['color-primary-500']}
              />
              <Text>
                Agree to follow all TTU and RaiderRide{'\n'}rules and
                regulations.
              </Text>
            </Layout>
            <Layout style={homeStyle.rulesContainer}>
              <FontAwesomeIcon
                icon={faEye}
                size={20}
                style={homeStyle.icon}
                color={raiderRideTheme['color-primary-500']}
              />
              <Text>
                Make sure you are in a spot where{'\n'}
                your driver can see you.
              </Text>
            </Layout>
          </Layout>
        </Layout>
        <Layout style={style.bottomButtonContainer}>
          <Button
            disabled={dropoffLocation === null || pickupLocation === null}>
            BOOK RIDE
          </Button>
        </Layout>
      </Layout>
    </SafeAreaView>
  );
};

export default Home;
