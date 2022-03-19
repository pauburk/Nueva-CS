//requires mongoose from npm
const mongoose = require('mongoose');

//runs our main function, catching any errors
main().catch(err => console.log(err));

async function main() {
  // tries to establish a connection
  let response = await mongoose.connect('mongodb://localhost:27017/test')
  //if the response does not fail, then it moves on to handle the connection
  .then(handleConnection());

}

function handleConnection(){
  let db = mongoose.connection;

  //.on() comes from mongoose. We are telling our db to runs this everytime an 'error' happen.
  db.on('error', console.error.bind(console, 'connection error:'));
  //.once() comes from mongoose. We are telling our db to runs this once when an 'open' happens.
  db.once('open', function() {
	console.log("Connection Successful!");
  });
}
