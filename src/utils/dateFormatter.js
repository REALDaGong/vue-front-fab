export function formatDate (d) {
  return d.getFullYear().toString() + '-' + ('0' + (d.getMonth() + 1).toString()).slice(-2) + '-' + ('0' + d.getDate().toString()).slice(-2) + ' :' +
  d.getHours().toString() + ':' + d.getMinutes().toString() + ':' + d.getSeconds().toString()
}
