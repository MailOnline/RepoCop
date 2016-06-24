var fs = require('fs');
var path = require('path');
var _ = require('lodash');
var environment = require('./environment');

module.exports = config();

function config() {

    var files = {
        default_config: path.join('conf', 'default.json'),    
        environmental_config: path.join('conf', environment + '.json'),
        private_config: path.join('conf', 'private.json')
    }

    var nconf = require('nconf').argv();
    // nconf.file('private config', path.join('conf', 'private.json'));
    nconf.file('environmental config', path.join('conf', environment + '.json'));
    nconf.file('default config', path.join('conf', 'default.json'));
    var cfg = nconf.get();
    var auth = cfg.survey.organisations[0].authentication;
    auth.username = process.env.REPOMAN_GITHUB_USERNAME;
    auth.password = process.env.REPOMAN_GITHUB_TOKEN;

    // console.log(nconf.get(), nconf.get().survey.organisations);
    return cfg;
}
