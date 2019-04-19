module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps: [

    // First application
    {
      name: 'gate-development',
      script: 'gate.js',
      watch: true,
      watch_options: {
        "useFsEvents": true
      },
      env: {
        "PORT": 3002,
        "NODE_ENV": "development"
      },
      // env_production: {
      //   "PORT": 1336,
      //   "NODE_ENV": "production",
      // }
    },
  ],
};