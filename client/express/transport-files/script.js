class Widget {
  constructor(el) {
    this.el = el
  }

  close() {
    this.el.classList.toggle('support_widget_container--closed')
  }

  addMessage() {

  }

  login() {
    
  }
}

var widget = new Widget(document.querySelector('.support_widget'))

widget.close()