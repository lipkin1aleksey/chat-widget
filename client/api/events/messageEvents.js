export default {
  'getToken': function(data) {
    localStorage.setItem( 'tokem', data.token )
  }
}