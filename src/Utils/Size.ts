/**
 * @fileoverview This utility module allows us to size based on the figma mockup provided,
 * via a function. It is dependent on the react-native-pixel-perfect class.
 *
 */

import {create} from 'react-native-pixel-perfect';

const designDimensions = {
  width: 780,
  height: 1688,
};

/**
 * Changes the measurements to match the mockup. To use, simply put in
 * the raw values from the figma mockup, and it will be sized correctly on
 * the device.
 *
 * @param {number} mSize The raw size from the mockup
 * @function
 */
const size: (mSize: number) => number = create(designDimensions);

export default size;
