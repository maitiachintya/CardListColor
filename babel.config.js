module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module:react-native-dotenv',
      {
        envName: 'RN_ENV',
        moduleName: '@env',
        path: '.env',
        safe: true,
        allowUndefined: true,
      },
    ],
  ],
};
