/**
 * @fileoverview The login home page component
 */
import {Button, Divider, Input, Layout, Text} from '@ui-kitten/components';
import React, {useContext, useEffect, useState} from 'react';
import {StatusBar} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {GlobalContext} from '../App';
import style from '../Styles/style';
import AppContext from '../Utils/AppContext';
import {NavigationProp} from '@react-navigation/native';
import moment from 'moment';

/**
 * This is an array used to grab the description of the time of day for
 * the login page.
 */
const timeDescriptors = [
  [18, 'Good Evening'],
  [12, 'Good Afternoon'],
  [0, 'Good Morning'],
];

export interface LoginProps {
  navigation: NavigationProp<any, any>;
}

/**
 * The login page component
 * @component
 */
const Login = ({}: LoginProps) => {
  /**
   * This is the global state from the context provider.
   */
  const globalState: GlobalContext = useContext<GlobalContext>(AppContext);

  const [timeString, setTimeString] = useState('Hello There');
  useEffect(() => {
    let hour = moment().hours();
    for (let i = 0; i < timeDescriptors.length; i++) {
      if (hour >= timeDescriptors[i][0]) {
        var description = timeDescriptors[i][1] as string;
        setTimeString(description);
        break;
      }
    }
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'white',
        padding: 15,
        justifyContent: 'space-around',
      }}>
      <StatusBar barStyle={'dark-content'} />
      <Layout style={{flex: 1, justifyContent: 'center'}}>
        <Text status="primary" category={'h3'}>
          {timeString}
        </Text>
        <Text style={{fontWeight: '500'}} status={'primary'} category={'h4'}>
          Welcome to RaiderRide
        </Text>
      </Layout>
      <Layout style={{flex: 4, justifyContent: 'center'}}>
        <Layout>
          <Text style={{marginVertical: 10}} category={'s1'}>
            Login As A Student
          </Text>
          <Button
            onPress={() => {
              globalState.authManager.signIn();
            }}>
            SIGN IN WITH RAIDERLINK
          </Button>
        </Layout>
        <Divider style={{marginVertical: 25}} />
        <Layout>
          <Text category={'s1'}>Login As A Driver</Text>
          <Text style={style.label} category={'label'}>
            USERNAME
          </Text>
          <Input placeholder={'Username'} />
          <Text style={[style.label, {marginTop: 20}]} category={'label'}>
            PASSWORD
          </Text>
          <Input placeholder={'Password'} secureTextEntry />
          <Button style={{marginTop: 20}}>LOGIN AS A DRIVER</Button>
        </Layout>
      </Layout>
      <Layout
        style={{flex: 2, justifyContent: 'flex-end', alignItems: 'center'}}>
        <Text style={{textAlign: 'center'}}>
          RaiderRide Dev Build{'\n'}Not Final Product
        </Text>
      </Layout>
    </SafeAreaView>
  );
};

export default Login;
