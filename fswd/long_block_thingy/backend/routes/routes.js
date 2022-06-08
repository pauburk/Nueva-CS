const express = require('express')
const router = express.Router()
const NuevanSchema = require('../models/Nuevan.js')

/*
@Route: GET '/nuevans'
@Description:
  Gets all Nuevans
  request:
    request params: NA
    request body: NA
  response:
    all nuevans
*/
router.get('/get-nuevans', (req, res) => {
    NuevanSchema.find({
    })
    //'then' happens if find is succesful
    .then(nuevans => {
      console.log("succesfully got entire db from c!")
      res.json(nuevans)
    })
    //if theres an error, 'catch' happens instead
    .catch(err => {
      res.status(404)
        .json(
          { nonuevansfound: 'No Nuevans found' }
        )
    })
})

/*
@Route: GET '/show/:email'
@Description:
  Gets one Nuevan from the database by email
  request:
    request params: email
    request body: None
  response:
    matching user
*/
router.get('/get/:email', (req, res) => {
    NuevanSchema.findOne({email: req.params.email})
    .then(nuevan => {
      console.log("succesfully got one!")
      res.json(nuevan)
    })
    .catch(err => {
      res.status(404)
        .json(
          { nonuevansfound: 'No Nuevan found' }
        )
    })
})


/*
@Route: POST '/create'
@Description:
  Adds a new nuevan to the DB
  request:
    request params: none
    request body: JSON object; must include email
    example request body:
      {
        'name': "Name",
        'email': "Email"
      }
  response:
    sends back message saying user was succesfully posted
    along with user information
*/
router.post('/create', (req, res) => {
    console.log("posting...")
    NuevanSchema.create(req.body)
      .then(new_user => {
        console.log("succesfully posted")
        res.json({
          message: "user "+ req.body.name +" added successfully",
          user: new_user,
        })
      })
      .catch(err => {
        res.status(404)
          .json(
            { unabletoadd: 'Unable to add this nuevan' }
          )
      })
})

/*
@Route: PUT '/update/:email'
@Description:
  Updates a Nuevan with a given email
  request:
    request params: email
    request body: JSON object;
    example request body:
      {
        'name': "Name",
        'email': "Email"
      }
  response:
    sends back message saying user email was succesfully updated
*/
router.put('/update/:email', (req, res) => {
    NuevanSchema.updateOne(
      {email: req.params.email},
      {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
        grade: req.body.grade
      }
    )
      .then(updated_data => {
        res.json({
          message: "succesfully updated user with new email: " + req.params.email,
          updated_data: updated_data
        })
      })
      .catch(err =>{
        res.status(400).json({ error: 'Unable to update the database' })
      })
})

/*
@Route: DELETE '/delete/:email'
@Description:
  Updates a Nuevan with a given email
  request:
    request params: email
    request body: None
  response:
    sends back message saying user email was succesfully updated
*/
router.delete('/delete/:email', (req, res) => {
    NuevanSchema.deleteOne(
      {email: req.params.email}
    )
    .then(deleted_data => {
      res.json({
        message: "succesfully deleted user w email: " + req.params.email,
        deleted_data: deleted_data
      })
    })
    .catch(err =>{
      res.status(400).json({error: "Unable to delete"})
    })
})

module.exports = router
