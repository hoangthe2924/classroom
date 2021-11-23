const path = require('path');

module.exports = {
  resolve: {
    alias: {
      'components': path.resolve(__dirname, 'src/components'),
      'services': path.resolve(__dirname, 'src/services'),
    },
    extensions: ['.jsx', '.js', '.scss', '.json'],
  },
};