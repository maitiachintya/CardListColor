import {View, Text, SafeAreaView} from 'react-native';
import React from 'react';
import Home from './src/screens/Home/index'
import 'react-native-gesture-handler';

const App = () => {
  return (
    <SafeAreaView >
      <Home />
    </SafeAreaView>
  );
};

export default App;
