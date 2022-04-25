/**
 * @fileoverview The rider home screen component
 */

/* ------------------------------ React Imports ----------------------------- */
import React from 'react';
import {
  Dimensions,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
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
import MapboxGL from '@rnmapbox/maps';

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
    bottom: Platform.OS === 'android' ? size(-10) : 0,
    left: 0,
    height:
      Platform.OS === 'android'
        ? height - size(320) - size(10)
        : height - size(320) + size(10),
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
    padding: size(30),
  },
  rulesContainer: {
    marginVertical: size(8),
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginHorizontal: size(8),
  },
});

/**
 * Component for the driver home page.
 * @component
 */
const Home = () => {
  return (
    <SafeAreaView style={style.container}>
      <StatusBar barStyle={'dark-content'} />
      <MapboxGL.MapView
        style={[
          StyleSheet.absoluteFillObject,
          {
            height: size(320),
          },
        ]}
        contentInset={[10, 10, 10, 10]}
        logoPosition={{bottom: 5, left: 3}}
        tintColor={'red'}
        styleJSON={
          'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json'
        }>
        <MapboxGL.UserLocation />
        <MapboxGL.Camera
          defaultSettings={{
            centerCoordinate: [-111.8678, 40.2866],
            zoomLevel: 10,
          }}
          followUserMode="normal"
          followUserLocation={true}
        />
      </MapboxGL.MapView>
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
        <Btn onPress={() => {}} text={'Request Ride'} style="full" />
      </View>
    </SafeAreaView>
  );
};

export default Home;
