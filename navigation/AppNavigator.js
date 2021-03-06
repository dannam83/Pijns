import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import LoadAppScreen from '../screens/LoadAppScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import AuthScreen from '../screens/AuthScreen';
import MainTabNavigator from './MainTabNavigator';
import PostScreen from '../screens/PostScreen';
import PostNotesListScreen from '../screens/PostNotesListScreen';
import PostLikesScreen from '../screens/PostLikesScreen';
import TaggedFriendsScreen from '../screens/TaggedFriendsScreen';
import CommentsScreen from '../screens/CommentsScreen';
import CommentLikesScreen from '../screens/CommentLikesScreen';
import PublicProfileScreen from '../screens/PublicProfileScreen';
import AllChatsScreen from '../screens/AllChatsScreen';
import ChatScreen from '../screens/ChatScreen';
import PostCreateScreen from '../screens/PostCreateScreen';
import TagFriendsScreen from '../screens/TagFriendsScreen';

export default createAppContainer(createSwitchNavigator(
  {
    LoadApp: { screen: LoadAppScreen },
    Auth: { screen: AuthScreen },
    Welcome: { screen: WelcomeScreen },
    Main: { screen: createStackNavigator({
      MainTabs: {
        screen: MainTabNavigator,
        navigationOptions: { header: null },
      },
      PostScreen: {
        screen: PostScreen,
      },
      PostNotesListScreen: {
        screen: PostNotesListScreen,
      },
      PostLikesScreen: {
        screen: PostLikesScreen,
      },
      TaggedFriendsScreen: {
        screen: TaggedFriendsScreen,
      },
      CommentsScreen: {
        screen: CommentsScreen,
      },
      CommentLikesScreen: {
        screen: CommentLikesScreen,
      },
      PublicProfileScreen: {
        screen: PublicProfileScreen,
      },
      AllChatsScreen: {
        screen: AllChatsScreen,
      },
      ChatScreen: {
        screen: ChatScreen,
      },
      PostCreateScreen: {
        screen: PostCreateScreen,
      },
      PostCreate_TagFriends: {
        screen: TagFriendsScreen
      },
    }) },
  },
  {
    initialRouteName: 'LoadApp',
    headerMode: 'screen'
  }
));
