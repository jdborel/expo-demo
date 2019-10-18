import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import AuthenticationNavigator from './AuthenticationNavigator';

export default createAppContainer(
  createSwitchNavigator({
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    Authentication: AuthenticationNavigator,
    Main: MainTabNavigator
  })
);