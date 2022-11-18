import * as React from 'react'
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import DrawerNavigator from '../navigation/drawerNavigator';

export default function DashboardScreen() {
  return (
    <NavigationContainer>
      <DrawerNavigator/>
    </NavigationContainer>
  );
}