//get the things we need
const express = require('express');
const database = require('./mongoose-db-w-schema');
const UserModel = require('./schema/User.js')
const app = express()
const port = 3000

//@Get at our localhost:3000 port
app.get('/', function(req, res, next) {
  console.log("doing a get")
  //an empty find will return the whole database
  UserModel
	.find({
  	//below is an example search query
  	// email: 'dalbanhidalgo@nuevaschool.org'
	})
	.then(doc => {
  	res.send(doc)
  	console.log(doc);
	})
	.catch(err => {
  	console.error(err)
	})
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
