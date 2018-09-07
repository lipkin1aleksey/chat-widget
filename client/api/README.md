# Turn on a Websocket Server

```
import WSServer from '...'

const wsServer = new WSServer("localhost", 5000)
```

# Send massage to server

```
var data = {
  message: 'Hello'
}
var eventName = "sayHello"

wsServer.send(eventName, data)
```

# Add event listener server's response

```
function alertMessage(data) {
  alert(data.message)
}
var eventName = "listenHello"

wsServer.on(eventName, alertMessage)
```

## All regular events should hold in the './api/message.js'