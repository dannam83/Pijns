// import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import LoadAppScreen from '../screens/LoadAppScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import AuthScreen from '../screens/AuthScreen';
import MainTabNavigator from './MainTabNavigator';

export default createAppContainer(createSwitchNavigator(
  {
    LoadApp: LoadAppScreen,
    Welcome: WelcomeScreen,
    Auth: AuthScreen,
    Main: MainTabNavigator,
  },
  {
    initialRouteName: 'LoadApp',
  }
));
