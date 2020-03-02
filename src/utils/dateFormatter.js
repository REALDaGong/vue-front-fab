export function formatDate (date) {
  var d = new Date()
  return d.getFullYear().toString() + '-' + (d.getMonth() + 1).toString() + '-' + d.getDate().toString() + ''
}
