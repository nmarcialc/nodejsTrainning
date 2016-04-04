var fs = require('fs');
var filecount = 0;
module.exports.createFile = function(path, name, data) {
    validatePath(path);
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