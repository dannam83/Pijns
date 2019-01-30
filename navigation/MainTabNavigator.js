import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import { AntDesign } from '@expo/vector-icons';

import TabBarIcon from '../components/TabBarIcon';
import MyPostsScreen from '../screens/MyPostsScreen';
import PostCreateScreen from '../screens/PostCreateScreen';
import PostEditScreen from '../screens/PostEditScreen';
import CommentsScreen from '../screens/CommentsScreen';
import LinksScreen from '../screens/LinksScreen';
import ProfileScreen from '../screens/ProfileScreen';

const LinksStack = createStackNavigator({
  Links: LinksScreen,
});

LinksStack.navigationOptions = {
  tabBarOptions: {
    showLabel: false,
    activeTintColor: 'rgba(0,125,255,1)',
    inactiveTintColor: 'gray'
  },
  tabBarIcon: ({ focused, tintColor }) => (
    <AntDesign
      focused={focused}
      name={'team'}
      size={25}
      color={tintColor}
    />
  ),
};

const MyPostsStack = createStackNavigator({
  MyPosts: MyPostsScreen,
  PostCreate: PostCreateScreen,
  PostEdit: PostEditScreen,
  Comments: CommentsScreen
});

MyPostsStack.navigationOptions = {
  tabBarOptions: {
    showLabel: false,
    activeTintColor: 'rgba(0,125,255,1)',
    inactiveTintColor: 'gray'
  },
  tabBarIcon: ({ focused, tintColor }) => {
    return (
      <AntDesign
        focused={focused}
        name={'user'}
        size={25}
        color={tintColor}
      />
    );
  },
};

const ProfileStack = createStackNavigator({
  Profile: ProfileScreen,
});

ProfileStack.navigationOptions = {
  tabBarOptions,
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  ),
};

const tabBarOptions = {
  showLabel: false,
  activeTintColor: 'rgba(0,125,255,1)',
  inactiveTintColor: 'gray'
};

export default createBottomTabNavigator({
  LinksStack,
  MyPostsStack,
  ProfileStack,
});
