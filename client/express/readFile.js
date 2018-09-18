const fs = require('fs')

module.exports.CSS = function() {
  return new Promise(res => {
    fs.readFile( __dirname + '/transport-files/style.css', function(err, data) {
      res( Buffer.from(data).toString('utf8') )
    })
  })
}

module.exports.HTML = function(params) {
  return new Promise(res => {
    fs.readFile( __dirname + '/transport-files/tamplate.html', function(err, data) {
      var tamplate = Buffer.from(data).toString('utf8')
  
      for(var paramName in params) {
        tamplate = tamplate.replace('{{' + paramName + '}}', params[paramName])
      }
  
      res(tamplate)
    })
  })
}