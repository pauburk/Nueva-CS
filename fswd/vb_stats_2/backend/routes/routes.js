const express = require('express')
const router = express.Router()
const PlayerSchema = require('../models/Player.js')


router.get('/getPlayers', (req, res) => {
    PlayerSchema.find({})
    .then(players => {
      console.log("Players successfully found")
      res.json(players)
    })
    .catch(err => {
      res.status(404)
        .json(
          { noplayersfound: 'No players found' }
        )
    })
})


router.get('/getPlayer/:id', (req, res) => {
    PlayerSchema.findOne({id: req.params.id})
    .then(player => {
      console.log("Player succesfully found")
      res.json(player)
    })
    .catch(err => {
      res.status(404)
        .json(
          { noplayersfound: 'No player found' }
        )
    })
})


router.post('/addPlayer', (req, res) => {
    console.log("Posting...")
    PlayerSchema.create(req.body)
      .then(player => {
        console.log("Posted succesfully")
        res.json({
          message: "Successfully added player: \'" + req.body.name + "\'",
          user: player,
        })
      })
      .catch(err => {
        res.status(404)
          .json(
            { unabletoadd: "Error on adding player: \'" + req.body.name + "\'"}
          )
      })
})


router.put('/update/:id', (req, res) => {
    PlayerSchema.findOneAndUpdate(
        {id: req.params.id},
        {
            name: req.body.name,
            grade: req.body.grade,
            position: req.body.position,
            number: req.body.number,
            stats: {
                earned: {
                    ace: req.body.stats.earned.ace,
                    spike: req.body.stats.earned.spike,
                    tip: req.body.stats.earned.tip,
                    dump: req.body.stats.earned.dump,
                    downBallHit: req.body.stats.earned.downBallHit,
                    block: req.body.stats.earned.block,
                    assist: req.body.stats.earned.assist
                },
                errors: {
                    serve: req.body.stats.errors.serve,
                    spike: req.body.stats.errors.spike,
                    tip: req.body.stats.errors.tip,
                    dump: req.body.stats.errors.dump,
                    downBallHit: req.body.stats.errors.downBallHit,
                    block: req.body.stats.errors.block,
                    whoseBall: req.body.stats.errors.whoseBall,
                    receive: req.body.stats.errors.recieve,
                    dig: req.body.stats.errors.dig,
                    set: req.body.stats.errors.set,
                    freeBallRecieve: req.body.stats.errors.freeBallReceive,
                    ballReturnTwo: req.body.stats.errors.ballReturnTwo,
                    ballReturnThree: req.body.stats.errors.ballReturnThree
                },
                faults: {
                    net: req.body.stats.faults.net,
                    ball: req.body.stats.faults.ball,
                    handling: req.body.stats.faults.handling,
                    under: req.body.stats.faults.under,
                    overTheNet: req.body.stats.faults.overTheNet,
                    footFault: req.body.stats.faults.footFault,
                    outOfRotation: req.body.stats.faults.outOfRotation,
                    backRowAttack: req.body.stats.faults.backRowAttack
                }
            }
        }
    )
    .then(updated_data => {
        res.json({
            message: "Succesfully updated player with id: " + req.params.id,
            updated_data: updated_data
        })
    })
    .catch(err =>{
        res.status(400).json({ error: 'Error on updating player with id: ' + req.params.id})
    })
})


module.exports = router
