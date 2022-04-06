const express = require('express')
const router = express.Router()
const PlayerSchema = require('../models/Player.js')


router.get('/', (req, res) => {
    PlayerSchema.find({
    })
    .then(players => {
      console.log("Successfully retrieved all players.")
      console.log(players)
      res.json(players)
    })
    .catch(err => {
      console.error(err)
    })
})


router.post('/addplayer', (req, res) => {
    PlayerSchema.create({
        name: req.body.name,
        grade: req.body.grade,
        position: req.body.position,
        number: req.body.number
    })
    .then(player => {
        console.log("Successfully created new player.")
        console.log(player)
        res.json(player)
    })
    .catch(err => {
      console.error(err)
    })
})


router.put('/:id', (req, res) => {
    PlayerSchema.findByIdAndUpdate(req.params.id, {stats: req.body.stats})
    .then(player => {
        console.log("Successfully updated player, id:", req.params.id)
        console.log(player)
        res.json(player)
    })
    .catch(err => {
        console.error(err)
    })
})


module.exports = router
