module.exports = {
  reactStrictMode: true,
  // React Native Web setup: Configure Turbopack aliasing
  turbopack: {
    resolveAlias: {
      'react-native$': 'react-native-web',
      'react-native/': 'react-native-web/',
    },
    resolveExtensions: [
      '.web.js',
      '.web.jsx',
      '.web.ts',
      '.web.tsx',
      '.js',
      '.jsx',
      '.ts',
      '.tsx',
      '.json',
    ],
  },
  // React Native Web setup: Configure webpack aliasing for backward compatibility
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      'react-native$': 'react-native-web',
      'react-native/': 'react-native-web/',
    };
    config.resolve.extensions = [
      '.web.js',
      '.web.jsx',
      '.web.ts',
      '.web.tsx',
      ...config.resolve.extensions,
    ];
    config.externals = {
      ...config.externals,
      'react-native': 'react-native-web',
    };
    return config;
  },
};
