import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import NewReleasesScreen from '../screens/NewReleasesScreen';
import ScanScreen from '../screens/ScanScreen';
import MovieScreen from '../screens/MovieScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const NewReleasesStack = createStackNavigator(
  {
    NewReleases: NewReleasesScreen,
    Movie: MovieScreen
  },
  config
);

NewReleasesStack.navigationOptions = {
  tabBarLabel: 'New Releases',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  )
};

NewReleasesStack.path = '';

const ScanStack = createStackNavigator(
  {
    Scan: ScanScreen
  },
  config
)

ScanStack.navigationOptions = {
  tabBarLabel: 'Scan Tickets',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-list-box' : 'md-link'} />
  )
};

ScanStack.path = '';

const tabNavigator = createBottomTabNavigator({
  NewReleasesStack,
  ScanStack
});

tabNavigator.path = '';

export default tabNavigator;