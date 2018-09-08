module.exports = {
  'start': (visiter) => {
    visiter.send('getToken', { token: visiter.token })
  }
}