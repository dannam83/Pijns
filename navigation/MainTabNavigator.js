import React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import { AntDesign } from '@expo/vector-icons';

import UserFeedScreen from '../screens/UserFeedScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import SearchFriendsScreen from '../screens/SearchFriendsScreen';
import PersonalProfileScreen from '../screens/PersonalProfileScreen';
import PostCreateScreen from '../screens/PostCreateScreen';
import TagFriendsScreen from '../screens/TagFriendsScreen';
import PostEditScreen from '../screens/PostEditScreen';
import FriendListScreen from '../screens/FriendListScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import ChatScreen from '../screens/ChatScreen';
import AllChatsScreen from '../screens/AllChatsScreen';
import NotificationsIcon from '../components/navigation/NotificationsIcon';

const UserFeedStack = createStackNavigator({
  UserFeed: UserFeedScreen,
  UserFeed_SearchFriends: SearchFriendsScreen,
});

UserFeedStack.navigationOptions = {
  tabBarOptions: {
    showLabel: false,
    activeTintColor: 'rgba(0,125,255,1)',
    inactiveTintColor: 'gray'
  },
  tabBarIcon: ({ focused, tintColor }) => (
    <AntDesign
      focused={focused}
      name={'home'}
      size={28}
      color={tintColor}
    />
  ),
};

const FavoritesStack = createStackNavigator({
  Favorites: FavoritesScreen,
});

FavoritesStack.navigationOptions = {
  tabBarOptions: {
    showLabel: false,
    activeTintColor: 'rgba(0,125,255,1)',
    inactiveTintColor: 'gray'
  },
  tabBarIcon: ({ focused, tintColor }) => (
    <AntDesign
      focused={focused}
      name={'staro'}
      size={27}
      color={tintColor}
    />
  ),
};

const PostCreateStack = createStackNavigator({
  PostCreate: PostCreateScreen,
});

PostCreateStack.navigationOptions = ({ navigation }) => ({
  tabBarOptions: {
    showLabel: false,
    activeTintColor: 'rgba(0,125,255,1)',
    inactiveTintColor: 'gray'
  },
  tabBarIcon: ({ focused, tintColor }) => {
    return (
      <AntDesign
        focused={focused}
        name={'pluscircleo'}
        size={25}
        color={tintColor}
      />
    );
  },
  tabBarOnPress: () => navigation.navigate('PostCreateScreen'),
});

const NotificationsStack = createStackNavigator({
  Notifications: NotificationsScreen,
});

NotificationsStack.navigationOptions = {
  tabBarOptions: {
    showLabel: false,
    activeTintColor: 'rgba(0,125,255,1)',
    inactiveTintColor: 'gray'
  },
  tabBarIcon: ({ focused, tintColor }) => {
    return (
      Platform.OS === 'ios' ? (
        <NotificationsIcon
          focused={focused}
          name={'ios-notifications-outline'}
          size={29}
          color={tintColor}
        />
      ) : (
        <NotificationsIcon
          focused={focused}
          name={'md-notifications-outline'}
          size={29}
          color={tintColor}
        />
      )
    );
  },
};

const ProfileStack = createStackNavigator({
  Profile: PersonalProfileScreen,
  Profile_FriendList: FriendListScreen,
  Profile_PostEdit: PostEditScreen,
  Profile_TagFriends: TagFriendsScreen
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
        name={'user'}
        size={25}
        color={tintColor}
      />
    );
  },
};

export default createBottomTabNavigator({
  UserFeedStack,
  FavoritesStack,
  PostCreateStack,
  NotificationsStack,
  ProfileStack,
});
