/**
 * @fileoverview The rider home screen component
 */

/* ------------------------------ React Imports ----------------------------- */
import React, {useRef, useState} from 'react';
import {Dimensions, Platform, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

/* ------------------------------ Style Import ------------------------------ */
import style from '../Styles/style';

/* ---------------------------- Component Imports --------------------------- */
import RaiderRideHeader from './Common/RaiderRideHeader';
import Btn from './Common/Btn';
import LocationInput from './Common/LocationInput';
import Divider from './Common/Divider';
import size from '../Utils/Size';

/* ------------------------------- Map Imports ------------------------------ */
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import mapStyle from '../Utils/MapStyle';

/* -------------------------- Font Awesome Imports -------------------------- */
import {
  faBook,
  faIdCard,
  faLocationArrow,
  faMapLocation,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

const {height} = Dimensions.get('screen');

const homeStyle = StyleSheet.create({
  overlayBottom: {
    backgroundColor: 'white',
    position: 'absolute',
    bottom: Platform.OS === 'android' ? size(-20) : 0,
    left: 0,
    height:
      Platform.OS === 'android'
        ? height - size(640) + size(40)
        : height - size(640) + size(20),
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
    padding: size(60),
  },
  rulesContainer: {
    marginVertical: size(15),
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginHorizontal: size(15),
  },
});

/**
 * Component for the driver home page.
 * @component
 */
const Home = () => {
  const [region, setRegion] = useState({
    latitude: 0,
    latitudeDelta: 0,
    longitude: -101.86742808669806,
    longitudeDelta: 0.004632845520973206,
  });

  /**
   * This is used to set the map region to the user location on first load.
   */
  const [isFirstFetch, setFirstFetch] = useState(true);

  /**
   * The reference to the map object.
   */
  const mapRef: React.LegacyRef<MapView> | undefined = useRef(null);

  return (
    <SafeAreaView style={style.container}>
      <MapView
        style={[
          StyleSheet.absoluteFillObject,
          {
            height: size(640),
          },
        ]}
        userInterfaceStyle={'light'}
        provider={PROVIDER_GOOGLE}
        customMapStyle={mapStyle}
        initialRegion={region}
        onRegionChangeComplete={(r, d) => {
          if (d?.isGesture) {
            setRegion(r);
          }
        }}
        ref={mapRef}
        showsUserLocation={true}
        showsBuildings={false}
        onUserLocationChange={location => {
          if (isFirstFetch && mapRef !== null) {
            mapRef.current.animateToRegion({
              latitude: location.nativeEvent.coordinate.latitude,
              longitude: location.nativeEvent.coordinate.longitude,
              latitudeDelta: region.latitudeDelta,
              longitudeDelta: region.longitudeDelta,
            });
            setFirstFetch(false);
          }
        }}
        paddingAdjustmentBehavior={'automatic'}
        mapPadding={{top: size(10), bottom: size(25), left: 0, right: 0}}
      />
      <RaiderRideHeader />
      <View style={homeStyle.overlayBottom}>
        <Text style={style.headerText}>
          Hi John,{'\n'}Where do you need to go?
        </Text>
        <Text style={style.label}>Pickup Location</Text>
        <LocationInput icon={faLocationArrow} onPress={() => {}} />
        <Text style={style.label}>Dropoff Location</Text>
        <LocationInput icon={faMapLocation} onPress={() => {}} />
        <Divider />
        <Text style={style.subHeaderText}>Before you can ride you must:</Text>
        <View style={homeStyle.rulesContainer}>
          <FontAwesomeIcon
            icon={faIdCard}
            size={20}
            color={'#e54545'}
            style={homeStyle.icon}
          />
          <Text style={style.text}>Have your valid TTU student ID.</Text>
        </View>
        <View style={homeStyle.rulesContainer}>
          <FontAwesomeIcon
            icon={faBook}
            size={20}
            color={'#e54545'}
            style={homeStyle.icon}
          />
          <Text style={style.text}>
            Agree to follow all TTU and{'\n'}RaiderRide rules and regulations.
          </Text>
        </View>
        <Btn onPress={() => {}} text={'Request Ride'} style="outline" />
      </View>
    </SafeAreaView>
  );
};

export default Home;
