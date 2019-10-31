import React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import { AntDesign } from '@expo/vector-icons';

import UserFeedScreen from '../screens/UserFeedScreen';
import SearchFriendsScreen from '../screens/SearchFriendsScreen';
import PublicProfileScreen from '../screens/PublicProfileScreen';
import PersonalProfileScreen from '../screens/PersonalProfileScreen';
import PostCreateScreen from '../screens/PostCreateScreen';
import TagFriendsScreen from '../screens/TagFriendsScreen';
import PostEditScreen from '../screens/PostEditScreen';
import PostNotesListScreen from '../screens/PostNotesListScreen';
import CommentsScreen from '../screens/CommentsScreen';
import CommentLikesScreen from '../screens/CommentLikesScreen';
import FriendListScreen from '../screens/FriendListScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import ChatScreen from '../screens/ChatScreen';
import AllChatsScreen from '../screens/AllChatsScreen';
import PostScreen from '../screens/PostScreen';
import NotificationsIcon from '../components/navigation/NotificationsIcon';
import MessagesIcon from '../components/navigation/MessagesIcon';

const UserFeedStack = createStackNavigator({
  UserFeed: UserFeedScreen,
  UserFeed_SearchFriends: SearchFriendsScreen,
  UserFeed_PublicProfile: PublicProfileScreen,
  UserFeed_Comments: CommentsScreen,
  UserFeed_Notes: PostNotesListScreen,
  UserFeed_CommentLikes: CommentLikesScreen,
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

const ChatStack = createStackNavigator({
  Chats: AllChatsScreen,
  Chats_Chat: ChatScreen
});

ChatStack.navigationOptions = {
  tabBarOptions: {
    showLabel: false,
    activeTintColor: 'rgba(0,125,255,1)',
    inactiveTintColor: 'gray'
  },
  tabBarIcon: ({ focused, tintColor }) => (
    <MessagesIcon
      focused={focused}
      name={'send'}
      size={27}
      color={tintColor}
    />
  ),
};

const PostCreateStack = createStackNavigator({
  PostCreate: PostCreateScreen,
  PostCreate_TagFriends: TagFriendsScreen
});

PostCreateStack.navigationOptions = {
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
};

const NotificationsStack = createStackNavigator({
  Notifications: NotificationsScreen,
  Notifications_PublicProfile: PublicProfileScreen,
  Notifications_Chat: ChatScreen,
  Notifications_Notes: PostNotesListScreen,
  Notifications_Post: PostScreen,
  Notifications_Comments: CommentsScreen,
  Notifications_CommentLikes: CommentLikesScreen,
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
  Profile_PublicProfile: PublicProfileScreen,
  Profile_Chat: ChatScreen,
  Profile_Comments: CommentsScreen,
  Profile_Notes: PostNotesListScreen,
  Profile_PostEdit: PostEditScreen,
  Profile_CommentLikes: CommentLikesScreen,
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
  ChatStack,
  PostCreateStack,
  NotificationsStack,
  ProfileStack,
});
