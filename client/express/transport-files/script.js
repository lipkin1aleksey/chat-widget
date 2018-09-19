class Widget {
  constructor(el) {
    this.el = el
    this.giveEventsForButtons()
  }

  giveEventsForButtons() {
    this.el.querySelector('#support_widget__close').addEventListener('click', () => this.turn())
    this.el.querySelector('.support_widget__header-img').addEventListener('click', () => this.turn())
  }

  turn() {
    this.el.classList.toggle('support_widget_container--closed')
  }

  addMessage() {

  }

  login() {

  }
}

var widget = new Widget(document.querySelector('.support_widget'))

// widget.close()