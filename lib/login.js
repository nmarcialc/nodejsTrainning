var request = require('./request');
module.exports.login = function(host, apiKey, retailerId, successLogin) {

    var data = {
        apiKey: apiKey,
        retailerId: retailerId
    };

    request.performRequest(host, '/bl-server/api/auth/appLogin', 'POST', data, {}, successLogin);
};
