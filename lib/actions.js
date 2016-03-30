var login = require('./login');
var backupconfig = require('./backupConfig');
var purgeconfig = require('./purgeConfig');
var request = require('./request');
var file = require('./fileOperations');


module.exports.backup = function(host, apiKey, retailerId, destination) {

    var sucess = function(data) {
        var sessionId;
        sessionId = data.token;
        backupconfig.forEach(function(entry) {
            createJson(host, entry, sessionId, destination);

        });
    };

    login.login(host, apiKey, retailerId, sucess);

};

module.exports.restore = function(host, apiKey, retailerId, source) {

    var sucess = function(data) {
        var sessionId;
        sessionId = data.token;
        //restore data  
    };

    login.login(host, apiKey, retailerId, sucess);

};

module.exports.purge = function(host, apiKey, retailerId) {
    var sucess = function(data) {
        var sessionId;
        sessionId = data.token;
        backupconfig.forEach(function(entry) {
            //call purge endpoint

        });
    };

    login.login(host, apiKey, retailerId, sucess);
};

var createJson = function(host, entry, sessionId, destination) {
    var headers = {
        token: sessionId
    };

    var sucessEndPoint = function(data) {
        //console.log("End Point --->");
        //console.log(data);
        file.createFile(destination, entry.name, data);
    };

    request.performRequest(host, entry.endpoint, entry.method, {}, headers, sucessEndPoint);
};
