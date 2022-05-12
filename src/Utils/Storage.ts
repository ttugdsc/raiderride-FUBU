/**
 * This contains the primary storage object.
 */

import {MMKV} from 'react-native-mmkv';

/**
 * This is the authStorage provider.
 * Powered by MMKV.
 */
export const authStorage = new MMKV({
  id: 'authData',
});
