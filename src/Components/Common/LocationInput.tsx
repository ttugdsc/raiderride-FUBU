/**
 * @fileoverview Contains the location input
 */

/* ------------------------------ React Imports ----------------------------- */
import React from 'react';
import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableHighlight,
} from 'react-native';
import size from '../../Utils/Size';

/* --------------------------- Font Awesome Icons --------------------------- */
import {IconProp} from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

/**
 * The styles for this component
 */
const styles = StyleSheet.create({
  container: {
    height: size(43),
    backgroundColor: 'white',
    borderRadius: size(8),
    borderColor: '#979797',
    borderWidth: size(1),
    alignItems: 'center',
    flexDirection: 'row',
  },
  icon: {
    marginHorizontal: size(8),
  },
  text: {
    fontSize: size(16),
    color: 'black',
  },
});

/**
 * The props for the LocationInput component
 */
interface locationInputProps {
  /**
   * The font awesome icon to use to the left of the text.
   */
  icon: IconProp;
  /**
   * The function to call when the input is pressed.
   */
  onPress: (event: GestureResponderEvent) => void;
}

/**
 * Used as a location input button. Should be combined with a modal or another
 * component that is opened with the "onPress" prop.
 *
 * @param {locationInputProps} props The props for this component.
 */
const LocationInput = (props: locationInputProps) => {
  return (
    <TouchableHighlight
      underlayColor={'#e5454525'}
      style={styles.container}
      onPress={props.onPress}>
      <>
        <FontAwesomeIcon
          icon={props.icon}
          size={20}
          style={styles.icon}
          color={'#e54545'}
        />
        <Text style={styles.text}>Choose a Pickup Location</Text>
      </>
    </TouchableHighlight>
  );
};

export default LocationInput;
