/* ------------------------------ React Imports ----------------------------- */
import React, {useState} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

/* ------------------------------ Style Import ------------------------------ */
import style from '../Styles/style';

/* ---------------------------- Component Imports --------------------------- */
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import RaiderRideHeader from './Common/RaiderRideHeader';

const {width, height} = Dimensions.get('screen');

const homeStyle = StyleSheet.create({
  overlayBottom: {
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: height - (2 * height) / 5 + 20,
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
  },
});

const mapStyle = [
  {
    elementType: 'geometry',
    stylers: [
      {
        color: '#f5f5f5',
      },
    ],
  },
  {
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#616161',
      },
    ],
  },
  {
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#f5f5f5',
      },
    ],
  },
  {
    featureType: 'administrative.land_parcel',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#bdbdbd',
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'geometry',
    stylers: [
      {
        color: '#eeeeee',
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#757575',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [
      {
        color: '#e5e5e5',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#9e9e9e',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [
      {
        color: '#ffffff',
      },
    ],
  },
  {
    featureType: 'road.arterial',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#757575',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [
      {
        color: '#dadada',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#616161',
      },
    ],
  },
  {
    featureType: 'road.local',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#9e9e9e',
      },
    ],
  },
  {
    featureType: 'transit.line',
    elementType: 'geometry',
    stylers: [
      {
        color: '#e5e5e5',
      },
    ],
  },
  {
    featureType: 'transit.station',
    elementType: 'geometry',
    stylers: [
      {
        color: '#eeeeee',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [
      {
        color: '#c9c9c9',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#9e9e9e',
      },
    ],
  },
];

/**
 * Component for the driver home page.
 * @component
 */
const Home = () => {
  const [region, setRegion] = useState({
    latitude: 33.58935965506449,
    latitudeDelta: 0.003958420523986206,
    longitude: -101.86742808669806,
    longitudeDelta: 0.004632845520973206,
  });

  return (
    <SafeAreaView style={style.container}>
      <MapView
        style={[
          StyleSheet.absoluteFillObject,
          {height: (2 * height) / 5, zIndex: -1},
        ]}
        userInterfaceStyle={'light'}
        provider={PROVIDER_GOOGLE}
        customMapStyle={mapStyle}
        initialRegion={region}
        showsUserLocation={true}
        showsBuildings={false}
      />
      <RaiderRideHeader />
      <View style={homeStyle.overlayBottom} />
    </SafeAreaView>
  );
};

export default Home;
