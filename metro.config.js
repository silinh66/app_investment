// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname, {
  // [Web-only]: Enables CSS support in Metro.
  isCSSEnabled: true,
});


// Add the additional needed configuration for expo-router
const { resolver: { sourceExts, assetExts } } = config;

// Add support for importing from `.expo` and `.mjs` files
config.resolver.sourceExts = [...sourceExts, 'expo', 'mjs', 'svg'];

// Add alias support
config.resolver.alias = {
  '@': path.resolve(__dirname, './'),
};

config.transformer.babelTransformerPath = require.resolve('react-native-svg-transformer');

config.resolver.assetExts = config.resolver.assetExts.filter(ext => ext !== 'svg');
config.resolver.sourceExts.push('svg');

module.exports = config;