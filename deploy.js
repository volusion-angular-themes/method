var sys = require('sys');
var exec = require('child_process').execSync;
var version = process.argv[2];
var toolboxVersion = process.argv[3];

console.log('Version: ' + version);
console.log('Toolbox Version: ' + toolboxVersion);


console.log('Hubflow: Start Release');
exec('git hf release start ' + version);

var packageJson = require('./package.json');
var bowerJson = require('./bower.json');
var themeInfoJson = require('./app/settings/themeInfo.json');

var oldVersion = packageJson.version;
packageJson.version = version;
bowerJson.version = version;
bowerJson.dependencies['vn-toolbox-public'] = '~' + toolboxVersion;
themeInfoJson.version = version;
themeInfoJson.source = 'https://github.com/volusion-angular-themes/method/archive/v' + version + '.zip';

var fs = require('fs');
fs.writeFileSync('./package.json', JSON.stringify(packageJson, null, 2));
console.log('package.json has been updated');
fs.writeFileSync('./bower.json', JSON.stringify(bowerJson, null, 2));
console.log('bower.json has been updated');
fs.writeFileSync('./app/settings/themeInfo.json', JSON.stringify(themeInfoJson, null, 4));
console.log('themeInfo.json has been updated');

exec('git commit -am "bumped version from ' + oldVersion + ' to ' + version + '"');
console.log('Git: Commit Changes');

console.log('Run the following command to finish the release');
console.log('git hf release finish -m v' + version + ' ' + version);
