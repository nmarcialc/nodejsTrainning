var request = require('./request');
module.exports.login = function(apiKey,retailerId,successLogin){
    
    var data ={
     apiKey:apiKey,
    retailerId:retailerId
  };
    
    request.performRequest('dev.bridallive.com','/bl-server/api/auth/appLogin','POST',data,{},successLogin);
}
