/**
 * This contains the primary storage object.
 *
 *
 */

import {MMKV} from 'react-native-mmkv';

export const authStorage = new MMKV({
  id: 'authData',
});
