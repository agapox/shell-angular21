const { withNativeFederation, shareAll } = require('@angular-architects/native-federation/config');

module.exports = withNativeFederation({
  name: 'shell-angular21',

  shared: {
    ...shareAll({
      singleton: true,
      strictVersion: true,
      requiredVersion: 'auto',
    }),

    '@angular/cdk': {
      singleton: true,
      strictVersion: true,
      requiredVersion: 'auto',
    },
    '@angular/material': {
      singleton: true,
      strictVersion: true,
      requiredVersion: 'auto',
    },
    '@angular/animations': {
      singleton: true,
      strictVersion: true,
      requiredVersion: 'auto',
    },
  },

  skip: [
    'rxjs/ajax',
    'rxjs/fetch',
    'rxjs/testing',
    'rxjs/webSocket',
    '@platform/i18n',
    // Add further packages you don't need at runtime
  ],

  // Please read our FAQ about sharing libs:
  // https://shorturl.at/jmzH0

  features: {
    // New feature for more performance and avoiding
    // issues with node libs. Comment this out to
    // get the traditional behavior:
    ignoreUnusedDeps: true,
  },
});
