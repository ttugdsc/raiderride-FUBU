/* ------------------------------ React Imports ----------------------------- */
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const hStyle = StyleSheet.create({
  bold: {
    fontWeight: 'bold',
  },
  textStyle: {
    fontSize: 21,
    color: '#E54545',
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

/**
 * This is a component for the words "raiderRide" which appear at the top of every
 * component.
 * @component
 */
const RaiderRideHeader = () => {
  return (
    <View style={hStyle.header}>
      <Text style={hStyle.textStyle}>
        Raider<Text style={hStyle.bold}>Ride</Text>
      </Text>
    </View>
  );
};

export default RaiderRideHeader;
