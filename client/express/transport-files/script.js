class Widget {
  constructor(el) {
    this.el = el

    this.addMessageBtn = el.querySelector('.support_widget__button')
    this.addMessageInput = el.querySelector('.support_widget__entry')
    this.dialog = el.querySelector('.support_widget__mess-list')

    this.giveEventsForButtons()
  }

  giveEventsForButtons() {
    this.el.querySelector('#support_widget__close').addEventListener('click', () => this.turn())
    this.el.querySelector('.support_widget__header-button').addEventListener('click', () => this.turn())
  }

  turn() {
    this.el.classList.toggle('support_widget_container--closed')
  }

  addMessage(data) {
    var li = document.createElement('LI')
    if(data.sender.type === 'client')
      li.className = 'support_widget__mess-item support_widget__mess-user'
    else
      li.className = 'support_widget__mess-item support_widget__mess-admin'
    
    var info = document.createElement('SPAN')
    info.className = 'support_widget__mess-info'
    li.appendChild(info)

    var name = document.createElement('SPAN')
    name.className = 'support_widget__mess-name'
    name.innerText = data.sender.name
    info.appendChild(name)

    var date = document.createElement('SPAN')
    date.className = 'support_widget__mess-date'
    date.innerText = new Date(data.time).toDateString()
    info.appendChild(date)

    li.innerHTML += data.text

    this.dialog.appendChild(li)
    li.scrollIntoView()
  }

  addDialog(data) {
    data.forEach(message => this.addMessage(message) )
  }

  loginOff() {
    this.el.querySelector('#login').style.display = 'none'
  }
}

//// Web-socket ////

const messageEvents = {
  'setToken': function(data) {
    localStorage.setItem( 'token', data.token )
  },
  'getDialog': function(data) {
    widget.addDialog(data.dialog)
  },
  'getLastMessage': function(data) {
    widget.addMessage(data.message)
  }
}

const wsEvents = {
  onMessage: function(event) {
    const data = JSON.parse(event.data);
      
    this.messageEvents[data.event].call(this, data.data)
  },
  onOpen: function() {
    var token = localStorage.getItem( 'token' )
    if(token)
      this.send('continueDialog', { token })
  },
  onError: function() {
    alert('Not Catched error')

    throw new Error('Not Catched error')
  },
  onClone: function() {
    alert('Close the contection with server')
    
    throw new Error('Close the contection with server')
  }
}

class WSServer {
  constructor(address, port) {
    this.ws = new WebSocket("ws://" + address  + ':' + port)
    this.messageEvents = messageEvents
    this._setWsEvents()
  }

  _setWsEvents() {
    this.ws.onmessage = wsEvents.onMessage.bind(this)
    this.ws.onopen = wsEvents.onOpen.bind(this)
    this.ws.onclose = wsEvents.onClone.bind(this)
    this.ws.onerror = wsEvents.onError.bind(this)
  }

  on(event, func) {
    this.messageEvents[event] = func
  }

  send(event, data) {
    this.ws.send( JSON.stringify({
      event,
      data
    }) )    
  }
}

////////

function addClient() {
  widget.el.querySelector('.support_widget__name-button').onclick = () => {
    wsServer.send('addClient', {
      name: widget.el.querySelector('.support_widget__name-input').value,
      token: localStorage.getItem( 'token' )
    })
  
    widget.loginOff()
    widget.addMessageBtn.disabled = false;
  }
}

function checkToken() {
  if( localStorage.getItem('token') ) {
    widget.loginOff()
  } else {
    addClient()
    widget.addMessageBtn.disabled = true;
  }
}

function senderMessage() {
  wsServer.send('addMessage', { 
    token: localStorage.getItem('token'),
    text: widget.addMessageInput.value
  })

  widget.addMessageInput.placeholder = ""
  widget.addMessageInput.value = ""
}

//// Actions ////

var widget = new Widget(document.querySelector('.support_widget'))
var wsServer = new WSServer("localhost", 5000)

checkToken()
widget.addMessageBtn.addEventListener('click', senderMessage)
