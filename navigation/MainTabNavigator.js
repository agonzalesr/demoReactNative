import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import PrincipalScreen from '../screens/Principal';
import InicioScreen from "../screens/InicioScreen";
import AlbumScreen from "../screens/AlbumScreen";
import PhotoScreen from "../screens/PhotoScreen";

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});
//---------------------------------------------------
const HomeStack = createStackNavigator(
  {
    Home: InicioScreen,
  },
  config
);

HomeStack.navigationOptions = {
  tabBarLabel: 'Inicio',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-information-circle${focused ? '' : '-outline'}` : 'md-information-circle'  }
      name = {Platform.OS === 'ios' ? 'ios-home': 'md-home'}
    />
  ),
};

HomeStack.path = '';
//---------------------------------------------------
const AlbumsStack = createStackNavigator(
  {
    Album: { screen: AlbumScreen},
    Photos: {screen: PhotoScreen}

  },
  config
);

AlbumsStack.navigationOptions = {
  tabBarLabel: 'Álbumes',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} 
    name={Platform.OS === 'ios' ? 'ios-albums' : 'md-albums'} />
  ),
};

AlbumsStack.path = '';
//---------------------------------------------------
const SettingsStack = createStackNavigator(
  {
    Settings: SettingsScreen,
  },
  config
);

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} 
    name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
  ),
};

SettingsStack.path = '';
//---------------------------------------------------
const PrincipalStack = createStackNavigator(
  {
    Principal: PrincipalScreen,
  },
  config
);

PrincipalStack.navigationOptions = {
  tabBarLabel: 'Usuarios',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-person' : 'md-person'} />
  ),
};

PrincipalStack.path = '';
//---------------------------------------------------

const tabNavigator = createBottomTabNavigator({
  HomeStack,
  PrincipalStack,
  AlbumsStack,
  //SettingsStack,
});

tabNavigator.path = '';

export default tabNavigator;
