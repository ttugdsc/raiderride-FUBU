import {Platform, StyleSheet} from 'react-native';
import size from '../Utils/Size';

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'space-between',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: size(24),
    color: 'black',
  },
  subHeaderText: {
    fontWeight: 'bold',
    fontSize: size(16),
    marginBottom: size(10),
    color: 'black',
  },
  text: {
    fontSize: size(16),
    color: 'black',
  },
  label: {
    marginTop: 10,
    marginBottom: 2,
  },
  dividerMargins: {
    marginTop: size(25),
  },
  bottomButtonContainer: {
    justifyContent: 'center',
    paddingBottom: Platform.OS !== 'android' ? 50 : 10,
  },
});

export default style;
