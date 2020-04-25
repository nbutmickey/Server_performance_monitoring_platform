module.exports = {
  apps : [{
    script: './bin/www',
  }],

  deploy : {
    production : {
      user : 'root',
      host : '121.199.49.71',
      ref  : 'origin/master',
      repo : 'https://github.com/nbutmickey/Server_performance_monitoring_platform.git',
      path : '/var/www/production',
      'pre-deploy-local': '',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
