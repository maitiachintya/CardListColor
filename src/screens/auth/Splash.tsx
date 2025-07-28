import {View, Text, Image} from 'react-native';
import React from 'react';

const Splash = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Image
        source={{
          uri: 'https://png.pngtree.com/png-vector/20240614/ourmid/pngtree-an-app-logo-with-shadow-on-it-vector-png-image_7031252.png',
        }}
        style={{
          height: 150,
          width: 150,
          resizeMode: 'contain',
        }}
      />
    </View>
  );
};

export default Splash;
