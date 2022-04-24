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
    marginTop: size(10),
    marginBottom: size(8),
    fontSize: size(16),
    color: 'black',
  },
});

export default style;
