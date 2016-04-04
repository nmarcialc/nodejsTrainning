var fs = require('fs');
var filecount = 0;
module.exports.createFile = function(path, name, data) {
<<<<<<< HEAD
    //TODO validate existing folder
=======
    validatePath(path);
>>>>>>> c562931b5f1303ddac3101e4b6011e80fd3c59a6
    fs.writeFile(path + name + '.json', JSON.stringify(data), function(err) {
        if (err)
            return console.log(err);
        console.log(++filecount + ' ' + name + '.json');
    });
};

var validatePath = function(path) {
    var dirs = path.split(/[/\\]/g),
        dirCount = dirs.length;
    for (var i = 1; i <= dirCount; i++)
        validateDir(dirs.slice(0, i).join('/'));
};

var validateDir = function(dir) {
    try {
        fs.accessSync(dir, fs.F_OK);
    } catch (err) {
        fs.mkdirSync(dir);
    }
};