import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import TabNavigator from './tabNavigator';
import StoryScreen from '../screens/storyScreen';

const Stack = createStackNavigator()
export default function StackNavigator() {
  return (
    <Stack.Navigator initialRouteName='Home' screenOptions={{headerShown: false}}>
        <Stack.Screen name='Home' component={TabNavigator}/>
        <Stack.Screen name='StoryScreen' component={StoryScreen}/>
    </Stack.Navigator>
  );
}