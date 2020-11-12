const path = require('path');

module.exports = {
  webpackFinal: async (baseConfig, options) => {
    // Modify or replace config. Mutating the original reference object can cause unexpected bugs.
    const { module = {} } = baseConfig;

    const newConfig = {
      ...baseConfig,
      module: {
        ...module,
        rules: [...(module.rules || [])],
      },
    };

    // TypeScript with Next.js
    newConfig.module.rules.push({
      test: /\.(ts|tsx)$/,
      include: [
        path.resolve(__dirname, '../components'),
        path.resolve(__dirname, '../stories'),
      ],
      use: [
        {
          loader: 'babel-loader',
          options: {
            presets: ['next/babel'],
            plugins: ['react-docgen'],
          },
        },
      ],
    });
    newConfig.resolve.extensions.push('.ts', '.tsx');

    // Less
    // Remove original less loader
    newConfig.module.rules = baseConfig.module.rules.filter(
      (f) => f.test.toString() !== '/\\.less$/'
    );
    newConfig.module.rules.push({
      test: /\.less$/,
      include: [
        // Include antd to rebuild
        /[\\/]node_modules[\\/].*antd/,
        path.resolve(__dirname, '../assets/styles/antd.less'),
      ],
      use: [
        'style-loader',
        'css-loader',
        {
          loader: 'less-loader',
          options: {
            javascriptEnabled: true,
          },
        },
      ],
    });

    //
    // CSS Modules
    // Many thanks to https://github.com/storybookjs/storybook/issues/6055#issuecomment-521046352
    //

    // First we prevent webpack from using Storybook CSS rules to process CSS modules
    newConfig.module.rules.find(
      (rule) => rule.test.toString() === '/\\.css$/'
    ).exclude = /\.module\.css$/;

    // Then we tell webpack what to do with CSS modules
    newConfig.module.rules.push({
      test: /\.module\.css$/,
      include: [
        path.resolve(__dirname, '../common/components'),
        path.resolve(__dirname, '../common/layout'),
      ],
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            importLoaders: 1,
            modules: true,
          },
        },
      ],
    });

    newConfig.resolve.alias['/images'] = path.resolve(
      __dirname,
      '../public/images'
    );

    return newConfig;
  },
};
