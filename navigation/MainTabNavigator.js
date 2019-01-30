import React from 'react';
// import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import { AntDesign } from '@expo/vector-icons';

// import TabBarIcon from '../components/TabBarIcon';
import MyPostsScreen from '../screens/MyPostsScreen';
import FriendPostsScreen from '../screens/FriendPostsScreen';
import PostCreateScreen from '../screens/PostCreateScreen';
import PostEditScreen from '../screens/PostEditScreen';
import CommentsScreen from '../screens/CommentsScreen';
import ProfileScreen from '../screens/ProfileScreen';

const FriendPostsStack = createStackNavigator({
  FriendPosts: FriendPostsScreen,
});

FriendPostsStack.navigationOptions = {
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
  tabBarOptions: {
    showLabel: false,
    activeTintColor: 'rgba(0,125,255,1)',
    inactiveTintColor: 'gray'
  },
  tabBarIcon: ({ focused, tintColor }) => {
    return (
      <AntDesign
        focused={focused}
        name={'profile'}
        size={25}
        color={tintColor}
      />
    );
  },
};

export default createBottomTabNavigator({
  FriendPostsStack,
  MyPostsStack,
  ProfileStack,
});
