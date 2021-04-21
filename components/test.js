///nothing here just for pseudo code testing

const values = ['Belgium', 'Brest', 'Britian']
const query = 'Bri'

// /.*b.*e.*/
const re = RegExp(`.*${query.toLowerCase().split('').join('.*')}.*`)

// [ 'Belgium', 'Brest' ]
const matches = values.filter(v => v.toLowerCase().match(re))
console.log(matches);

