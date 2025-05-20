// navigation/StackNavigation.tsx
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  DefaultTheme,
  NavigationContainer,
  Theme,
} from '@react-navigation/native';
import {RootAuthStackParamList, RootMainStackParamList} from '../types';
import {navigationRef} from './RootNavigation';
import login from '../screens/auth/login';
import signup from '../screens/auth/signup';
import Home from '../screens/main/Home';
import List from '../screens/main/List';
import {useAppSelector} from '../redux/store/Store';

const Stack = createStackNavigator<RootMainStackParamList>();

const StackNavigation = () => {
  const _token = useAppSelector(state => state.auth.token);

  const theme: Theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: 'white',
    },
  };

  const AuthScreens: {
    [key in keyof RootAuthStackParamList]: React.ComponentType<any>;
  } = {
    Login: login,
    SignUp: signup,
  };

  const MainScreens: {
    [key in keyof RootMainStackParamList]: React.ComponentType<any>;
  } = {
    Dashboard: Home,
    List: List,
  };

  const screens = _token ? MainScreens : AuthScreens;

  return (
    <NavigationContainer theme={theme} ref={navigationRef}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {Object.entries(screens).map(([name, Component]) => (
          <Stack.Screen
            key={name}
            name={name as keyof RootMainStackParamList}
            component={Component}
            options={{gestureEnabled: true}}
          />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;
