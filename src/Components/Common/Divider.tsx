/**
 * @fileoverview A horizontal divider based on the figma mockups
 */

/* ------------------------------ React Imports ----------------------------- */
import React from 'react';
import {StyleSheet, View} from 'react-native';
import size from '../../Utils/Size';

const dividerStyle = StyleSheet.create({
  divider: {
    height: size(4),
    backgroundColor: '#6A6A6A41',
    marginVertical: size(45),
  },
});

/**
 * A horizontal divider
 */
const Divider = () => {
  return <View style={dividerStyle.divider} />;
};

export default Divider;
