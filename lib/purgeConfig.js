var path = require('path');
var fs = require('fs');

var json_path = path.join(__dirname, '../config/purgeEndPoints.json');

var config = JSON.parse(fs.readFileSync(json_path));

module.exports = config;