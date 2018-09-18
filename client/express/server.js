const express = require('express')

const app = express()

const readFile = require('./readFile')

app.get('/', async function(request, response){
  var style = await readFile.CSS()
  var tamplate = await readFile.HTML({
    position: request.query.position, 
    color: request.query.color
  })
  
  response.send( `
    var style = document.createElement('STYLE')
    style.innerHTML = \`${style}\`
    document.head.append(style)

    var tamplate = document.createElement('TAMPLATE')
    tamplate.innerHTML = \`${tamplate}\`
    document.body.append(tamplate)
  ` )
})

app.listen(3000, () => console.log('Server has been started on ' + 3000))
