var login = require('./login');
var backupconfig = require('./backupConfig');
var purgeconfig = require('./purgeConfig');
var request = require('./request');
var file = require('./fileOperations');


module.exports.backup = function(apiKey,retailerId){
   
  var sucess =function(data) {
   var sessionId;
    sessionId = data.token;
    backupconfig.forEach(function(entry) {
        createJson(entry,sessionId);
    
    });    
  };
  
    login.login(apiKey,retailerId,sucess);
  
};

module.exports.purge = function(apiKey,retailerId)
{
    var sucess =function(data) {
   var sessionId;
    sessionId = data.token;
    backupconfig.forEach(function(entry) {
        //call purge endpoint
    
    });    
  };
  
    login.login(apiKey,retailerId,sucess);
}

var createJson =function(entry, sessionId)
{
    var headers ={
        token : sessionId
    };
    
    var sucessEndPoint =function(data) {
        //console.log("End Point --->");
        //console.log(data);
        file.createFile('',entry.name,data);
    };

   request.performRequest('dev.bridallive.com',entry.endpoint,entry.method,{},headers, sucessEndPoint);
}



