// devpulse-pm2.config.js
module.exports = {
  apps: [
    {
      name: 'swissdev-tracker-agent',
      script: 'cmd.exe',
      args: '/c nx run @swissdev-tracker/agent:serve',
      cwd: 'C:/work/projects/monorepo/swissdev-tracker',
      watch: ['apps/agent', 'libs'],
      env: {
        NODE_ENV: 'development',
      },
    },
    {
      name: 'swissdev-tracker-api',
      script: 'cmd.exe',
      args: '/c nx run @swissdev-tracker/api:serve',
      cwd: 'C:/work/projects/monorepo/swissdev-tracker',
      watch: ['apps/api', 'libs'],
      env: {
        NODE_ENV: 'development',
      },
    },
  ],
};
