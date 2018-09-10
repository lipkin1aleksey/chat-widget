var http = require('http');
var Static = require('node-static');

// обычный сервер (статика) на порту 4000
var fileServer = new Static.Server('.');
http.createServer(function (req, res) {
  
  fileServer.serve(req, res);

}).listen(4000);

console.log("Сервер запущен на портах 8080");

