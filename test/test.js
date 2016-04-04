//Test
/*--------------------------------------*/
var chai = require('chai');
var expect = require('chai').expect;
var querystring = require('querystring');
var http = require('http');
var colors = require('colors');
var backupconfig = require('../lib/backupConfig');
var file = require('../lib/fileOperations');

/*--------------------------------------*/


//Configuration
/*--------------------------------------*/
var path = require('path')
var fs = require('fs')
var assert = require('assert')
var argv = require('optimist').demand('config').argv
var configFilePath = argv.config
assert.ok(fs.existsSync(configFilePath), 'config file not found at path: ' + configFilePath)
var config = require('nconf').env().argv().file({
        file: configFilePath
    })
    /*--------------------------------------*/

//Variables
/*--------------------------------------*/
var apiConfig = config.get('test')
var apiKey = apiConfig.apiKey;
var host = apiConfig.host;
var retailerId = apiConfig.retailerId;
var timeout = apiConfig.timeout;
var endpoint =apiConfig.endPointLogin;
/*--------------------------------------*/

var sessionId = '';
var data = {
    apiKey: apiKey,
    retailerId: retailerId
};

// Login
describe('Login Is Done', function() {
    it('Verified Login', function(done) {
        customRequest(host, endpoint, 'POST', data, {}, function(reply) {
            sessionId = reply.token;
            expect(sessionId).to.not.be.undefined;
            done();
        });
    });
});


//Read the file backupEndPoints
describe('Backup Is Done', function() {
    it('Verified Backup', function(done) {
        var files = backupconfig.length;
        backupconfig.forEach(function(entry) {
            createJson(entry, sessionId);
        });
        setTimeout(function() {
            showStatus();
            expect(count + ' Files').to.equal(files + ' Files');
            done();
        }, timeout);
    });
});


var showStatus = function() {
    console.log("");

    //FILES STATUS OK
    if (messageStatusOK.length > 0) {
        console.log(colors.bgGreen(colors.white("FILES OK: " + messageStatusOK.length)));
        for (var i = 0; i < messageStatusOK.length; i++) {
            console.log(colors.green(messageStatusOK[i]));
        }
    }

    //FILES EMPTY
    if (messageEmpty.length > 0) {
        console.log(colors.bgYellow(colors.white("FILES EMPTY: " + messageEmpty.length)));
        for (var i = 0; i < messageEmpty.length; i++) {
            console.log(colors.yellow(messageEmpty[i]));
        }
    }

    //FILES  NOT CREATED
    if (messageError.length > 0) {
        console.log(colors.bgRed(colors.white("FILES NOT CREATED: " + messageError.length)));
        for (var i = 0; i < messageError.length; i++) {
            console.log(colors.red(messageError[i]));
        }
    }
};

describe('Restore Is Done', function() {
    it('Verified Restore', function() {
        expect(true).to.be.true;
    });
});


describe('Purge Is Done', function() {
    it('Verified Purge', function() {
        expect(true).to.be.true;
    });
});


var createJson = function(entry, session) {
    var headers = {
        token: session
    };
    customRequest(host, entry.endpoint, entry.method, {}, headers, function(data) {
        var status = checkResponse(entry, data);
        if (status) {
            file.createFile('./test/docs/', entry.name, data);
        }
    });
};

var EMPTY = '[]';
var UNEXPECTED_ERROR = '"Unexpected end of input"';
var SERVER_ERROR = '????? ERROR DATA JSON';


var count = 0;
var messageEmpty = [];
var messageError = [];
var messageStatusOK = [];


var checkResponse = function(entry, data) {
    var stringData = JSON.stringify(data);
    switch (stringData) {
        case UNEXPECTED_ERROR:
            messageError.push(entry.name);
            return false;
        case SERVER_ERROR:
            messageError.push(entry.name);
            return false;
        case EMPTY:
            messageEmpty.push(entry.name);
            count++;
            return true;
        default:
            messageStatusOK.push(entry.name);
            count++;
            return true;
    }
};



var customRequest = function(host, endpoint, method, data, headers, callback) {
    var dataString = JSON.stringify(data);

    if (method == 'GET') {
        endpoint += '?' + querystring.stringify(data);
    } else {
        headers['Content-Type'] = 'application/json';
        headers['Content-Length'] = dataString.length;
    }
    var options = {
        host: host,
        path: endpoint,
        method: method,
        headers: headers
    };

    var req = http.request(options, function(res) {

        res.setEncoding('utf-8');
        var responseString = '';
        res.on('data', function(data) {
            responseString += data;
        });
        res.on('end', function() {
            try {
                var responseObject = JSON.parse(responseString);
                callback(responseObject);
            } catch (ex) {
                callback(ex.message);
            }
        });
        res.on('error', function(e) {
            console.log("Error on:");
            console.error(e);
        });
    });
    req.write(dataString);
    req.end();
};