let path = require('path');
let ejs = require('ejs');
let fse = require('fs-extra');
let config = require('../config');

let resultDirectory = 'dist/';

fse.copy(path.resolve(__dirname, '../images'), resultDirectory + 'images/', function(err){
  if (err) {
    return console.error(err);
  }
});

ejs.renderFile(path.resolve(__dirname, 'template.ejs'), config, null, function(err, html){
  if (err) {
    console.error(err);
  }
  else {
    fse.writeFile(resultDirectory + "index.html", html);
    console.log("Website generated successfully to: "+resultDirectory + "index.html");
  }
});