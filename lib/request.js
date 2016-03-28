var querystring = require('querystring');
var http = require('http');

module.exports.performRequest = function (host,endpoint, method, data,headers,success) {
  var dataString = JSON.stringify(data);
  

  if (method == 'GET') {
    endpoint += '?' + querystring.stringify(data);
  }
  else {
    headers['Content-Type']= 'application/json';
    headers['Content-Length']= dataString.length;
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
      //console.log(responseString);
        try
        {
          var responseObject = JSON.parse(responseString);
          success(responseObject);
        }
        catch (ex)
        {
          console.log(ex);
          success({});
        }
    });

    res.on('error',function(e){
      console.log("Error on:");
      console.error(e);
    });
  });

  req.write(dataString);
  req.end();
}