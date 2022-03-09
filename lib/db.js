const sqlite3 = require('sqlite3')
const Promise = require('bluebird')

var db = sqlite3.Database('./db.db', (err) => {
    if (err) {
        console.log('Could not connect to database', err)
    } else {
        console.log('Connected to database')
    }
})

export function creteTable() {

}