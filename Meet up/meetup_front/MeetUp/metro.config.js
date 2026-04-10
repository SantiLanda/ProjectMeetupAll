const {getDefaultConfig} = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = getDefaultConfig(__dirname);

config.resolver.assetExts = config.resolver.assetExts.concat(['obj', 'mtl', 'glb', 'gltf', 'fbx', 'bin', 'jpg', 'png'])

module.exports = config;
