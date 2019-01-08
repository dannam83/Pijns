import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import LoadAppScreen from '../screens/LoadAppScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import StartTabNavigator from './StartTabNavigator';
import MainTabNavigator from './MainTabNavigator';

export default createAppContainer(createSwitchNavigator(
  {
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    LoadApp: LoadAppScreen,
    Welcome: WelcomeScreen,
    Start: StartTabNavigator,
    Main: MainTabNavigator,
  },
  {
    initialRouteName: 'Welcome',
  }
));
