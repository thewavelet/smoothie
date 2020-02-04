/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import 'react-native-gesture-handler';

import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';

import SplashScreen from 'react-native-splash-screen';

import Navigator from '~/Screens/Navigator';
import {RandomUserDataProvider} from '~/Context/RandomUserData';

declare var global: {HermesInternal: null | {}};

interface Props {}

const App = ({}: Props) => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <RandomUserDataProvider cache={true}>
      <StatusBar barStyle="default" />
      <Navigator />
    </RandomUserDataProvider>
  );
};

export default App;
