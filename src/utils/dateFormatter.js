export function formatDate (d) {
  return d.getFullYear().toString() + '-' + 
        ('0' + (d.getMonth() + 1).toString()).slice(-2) + '-' + 
        ('0' + d.getDate().toString()).slice(-2) + ' ' +
        ('0' + d.getHours().toString()).slice(-2) + ':' +
        ('0' + d.getMinutes().toString()).slice(-2) + ':' + 
        ('0' + d.getSeconds().toString()).slice(-2);
}
