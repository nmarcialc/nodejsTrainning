var login = require('./login');
var config = require('./backupConfig');
var request = require('./request');
var file = require('./fileOperations');


module.exports.backup = function(apiKey,retailerId){
   
  var sucess =function(data) {
   var sessionId;
    sessionId = data.token;
    config.forEach(function(entry) {
        callJson(entry,sessionId);
    
    });    
  };
  
    login.login(apiKey,retailerId,sucess);
  
};


var callJson =function(entry, sessionId)
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



