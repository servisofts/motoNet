/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */
const path = require('path');
const { getDefaultConfig } = require('metro-config');

module.exports = (async () => {
  const {
    resolver: { sourceExts, assetExts }
  } = await getDefaultConfig();

  assetExts.push('pem');
  return {
    transformer: {
      babelTransformerPath: require.resolve('react-native-svg-transformer'),
      getTransformOptions: async () => ({
        transform: {
          experimentalImportSupport: false,
          inlineRequires: false
        }
      })
    },
    watchFolders: [
      // path.resolve(__dirname, '../../servisofts-component/dist'),
      // path.resolve(__dirname, '../../servisofts-background-location/dist'),
      // path.resolve(__dirname, '../../servisofts-page/dist'),
      // path.resolve(__dirname, '../../roles_permisos/library/dist'),
      // path.resolve(__dirname, '../../usuario/library/dist'),
      // path.resolve(__dirname, '../../chat/library/dist'),
      // path.resolve(__dirname, '../../geolocation/library/dist'),
    ],
    resolver: {
      assetExts: assetExts.filter((ext) => ext !== 'svg'),
      sourceExts: [...sourceExts, 'svg'],
      extraNodeModules: new Proxy(
        {},
        {
          get: (target, name) => {
            if (target.hasOwnProperty(name)) {
              return target[name];
            }
            return path.join(process.cwd(), `node_modules/${name}`);
          }
        }
      )
    }
  };
})();
