module.exports = {
  apps : [{
    script: './server/bin/www',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }],

  deploy : {
    production : {
      user : 'root',
      host : '121.199.49.71',
      port : '22',
      ref  : 'origin/master',
      repo : 'https://github.com/nbutmickey/Server_performance_monitoring_platform.git',
      path : '/var/www/production',
      'pre-deploy-local': '',
      'post-deploy' : 'pm2 start ./server/package.json  && pm2 start  ./server/bin/www.js && npm run build && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
