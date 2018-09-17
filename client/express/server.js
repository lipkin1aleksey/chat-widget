const express = require('express')
const app = express()

app.get('/', function(req, res){
  var style = `
    className {

    }

    className_red {

    }

    className_top-left {

    }
  `
  
  var tamplate = `
    <div class='className className_${req.query.color} className_${req.query.color}'></div>
  `

  res.send( `
    var div = document.createElement('DIV')
    div.innerHTML = \`${tamplate}\`
    document.body.append(div)

    var style = document.createElement('STYLE')
    style.innerHTML = \`${style}\`
    document.head.append(style)
  ` )
})
app.listen(3000, () => console.log('Server has been started on ' + 3000))