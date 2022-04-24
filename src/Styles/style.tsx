import {StyleSheet} from 'react-native';
import size from '../Utils/Size';

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'space-between',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: size(48),
  },
  subHeaderText: {
    fontWeight: 'bold',
    fontSize: size(32),
    marginBottom: size(20),
  },
  text: {
    fontSize: size(32),
  },
  label: {
    marginTop: size(20),
    marginBottom: size(15),
    fontSize: size(32),
  },
});

export default style;
