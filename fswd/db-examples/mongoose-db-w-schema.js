const mongoose = require('mongoose');
const userModel = require('./schema/User')

const server = '127.0.0.1:27017';
const database = 'users';  	// Since we made our schema into a model, this should be created

class Database {
  constructor() {
	this._connect()
  }

_connect() {
 	mongoose.connect(`mongodb://${server}/${database}`)
   	.then(testingSavingUser())
   	.catch(err => {
     	console.error('Database connection error')
   	})
  }
}

function testingSavingUser(){
    let user = new userModel({
        name: "David",
        email: "dalbanhidalgo@nuevaschool.org",
    })

    user.save()
    .then(doc => {
        console.log("user " +doc.name+ " added to the database")
        console.log(doc)
    })
    .catch(err => {
        console.error(err)
    })

    console.log('Database connection successful')
}

module.exports = new Database()
