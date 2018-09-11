## Turn on the Websocket Server

```
import WSServer from '...'

const wsServer = new WSServer("localhost", 5000)
```

## Send message to a server

```
var data = {
  message: 'Hello'
}
var eventName = "sayHello"

wsServer.send(eventName, data)
```

## Add event listener on a server's response

```
function alertMessage(data) {
  alert(data.message)
}
var eventName = "listenHello"

wsServer.on(eventName, alertMessage)
```

## All regular events should hold in the './api/events/messageEvents.js'