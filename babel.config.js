module.exports = {
  presets: ['module:@react-native/babel-preset'],
    plugins: [
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path: '.env',
        whitelist: ['API_BASE_URL', 'API_IMAGE_BASE_URL',],
        blocklist: null,
        allowlist: null,
        safe: false,
        allowUndefined: true,
      },
    ],
    'react-native-reanimated/plugin'
  ],
};
