import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import { AntDesign, Ionicons } from '@expo/vector-icons';

import FriendPostsScreen from '../screens/FriendPostsScreen';
import SearchFriendsScreen from '../screens/SearchFriendsScreen';
import PublicProfileScreen from '../screens/PublicProfileScreen';
import PersonalProfileScreen from '../screens/PersonalProfileScreen';
import MyPostsScreen from '../screens/MyPostsScreen';
import PostCreateScreen from '../screens/PostCreateScreen';
import PostEditScreen from '../screens/PostEditScreen';
import PostNotesListScreen from '../screens/PostNotesListScreen';
import CommentsScreen from '../screens/CommentsScreen';
import FriendListScreen from '../screens/FriendListScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import ChatScreen from '../screens/ChatScreen';

const FriendPostsStack = createStackNavigator({
  FriendPosts: FriendPostsScreen,
  FriendPosts_SearchFriends: SearchFriendsScreen,
  FriendPosts_PublicProfile: PublicProfileScreen,
  FriendPosts_Comments: CommentsScreen,
  FriendPosts_Notes: PostNotesListScreen,
  FriendPosts_Chat: ChatScreen
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
      size={28}
      color={tintColor}
    />
  ),
};

const MyPostsStack = createStackNavigator({
  MyPosts: MyPostsScreen,
  PostCreate: PostCreateScreen,
  PostEdit: PostEditScreen,
  MyPosts_Comments: CommentsScreen,
  MyPosts_Notes: PostNotesListScreen,
  MY_PublicProfile: PublicProfileScreen,
  MY_Friends: FriendListScreen,
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
        <Ionicons
          focused={focused}
          name={'ios-notifications-outline'}
          size={29}
          color={tintColor}
        />
      ) : (
        <Ionicons
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
  Profile_PublicProfile: PublicProfileScreen,
  Profile_Chat: ChatScreen,
  Profile_Comments: CommentsScreen,
  Profile_Notes: PostNotesListScreen
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
  NotificationsStack,
  ProfileStack,
});
