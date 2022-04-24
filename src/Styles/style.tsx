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
    color: 'black',
  },
  subHeaderText: {
    fontWeight: 'bold',
    fontSize: size(32),
    marginBottom: size(20),
    color: 'black',
  },
  text: {
    fontSize: size(32),
    color: 'black',
  },
  label: {
    marginTop: size(20),
    marginBottom: size(15),
    fontSize: size(32),
    color: 'black',
  },
});

export default style;
