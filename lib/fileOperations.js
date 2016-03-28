var fs = require('fs');
module.exports.createFile = function(path,name,data){

    fs.writeFile(name+'.jsn',  JSON.stringify(data), function (err) {
        if (err) 
            return console.log(err);
        console.log(name+'.json');
    });
};