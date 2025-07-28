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
import {useAppSelector} from '../redux/store/Store';
import Splash from '../screens/auth/Splash';
import TabNavigation from '../navigators/TabNavigation';
const Stack = createStackNavigator<RootMainStackParamList>();

const StackNavigation = () => {
  const {token, splashLoading} = useAppSelector(state => state.auth);

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
    TabNavigation: TabNavigation,
  };

  if (splashLoading) {
    return <Splash />;
  }

  const screens = token ? MainScreens : AuthScreens;

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
