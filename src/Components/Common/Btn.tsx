/**
 * @fileoverview Represents a button component with styling.
 *
 */

/* ------------------------------ React Imports ----------------------------- */
import React, {useState} from 'react';
import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableHighlight,
} from 'react-native';
import size from '../../Utils/Size';

/**
 * The props that are passed to a Btn component
 */
interface BtnProps {
  /**
   * The function to call when this button is pressed.
   */
  onPress: (event: GestureResponderEvent) => void;
  /**
   * The style of the button to show.
   */
  style?: 'outline' | 'full';
  /**
   * The text to show in the button
   */
  text: string;
}

const btnStyle = StyleSheet.create({
  full: {
    backgroundColor: '#e54545',
    borderRadius: 10,
    height: size(112),
    alignContent: 'center',
    justifyContent: 'center',
    marginTop: 15,
  },
  outline: {
    backgroundColor: 'white',
    borderColor: '#e54545',
    borderWidth: 2,
    borderRadius: 10,
    height: size(112),
    alignContent: 'center',
    justifyContent: 'center',
    marginTop: 15,
    color: '#e54545',
  },
  text: {
    fontSize: size(32),
    textAlign: 'center',
    color: 'white',
  },
  outlineText: {
    color: '#e54545',
  },
  bold: {
    color: 'white',
  },
});

/**
 * Represents a styled button based on the figma mockup.
 */
const Btn = (props: BtnProps) => {
  const [hasUnderlay, setHasUnderlay] = useState(false);
  return (
    <TouchableHighlight
      onPress={props.onPress}
      style={props.style === 'outline' ? btnStyle.outline : btnStyle.full}
      underlayColor={'#e22f2f'}
      onShowUnderlay={() => {
        setHasUnderlay(true);
      }}
      onHideUnderlay={() => {
        setHasUnderlay(false);
      }}>
      <Text
        style={[
          btnStyle.text,
          props.style === 'outline' ? btnStyle.outlineText : {},
          hasUnderlay ? btnStyle.bold : {},
        ]}>
        {props.text}
      </Text>
    </TouchableHighlight>
  );
};

export default Btn;
