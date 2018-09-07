export default {
  'reqToken': function(data) {
    localStorage.setItem( 'tokem', data.token )
  }
}