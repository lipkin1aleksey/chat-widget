const express = require('express')

const app = express()

app.get('/', function(req, res){
  res.send( 'alert("' + req.query.name + '")' )
})
app.listen(3000, () => console.log('Server has been started on ' + 3000))