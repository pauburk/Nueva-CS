const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlayerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    grade: {
        type: Number,
        enum: [9, 10, 11, 12],
        required: true
    },
    position: {
        type: String,
        enum: ["setter", "middle", "outside", "opposite"],
        required: true
    },
    number: {
        type: Number,
        required: true
    },
    stats: {
        earned: {
            ace: {type: Number, default: 0},
            spike: {type: Number, default: 0},
            tip: {type: Number, default: 0},
            dump: {type: Number, default: 0},
            downBallHit: {type: Number, default: 0},
            block: {type: Number, default: 0},
            assist: {type: Number, default: 0}
        },
        errors: {
            serve: {type: Number, default: 0},
            spike: {type: Number, default: 0},
            tip: {type: Number, default: 0},
            dump: {type: Number, default: 0},
            downBallHit: {type: Number, default: 0},
            block: {type: Number, default: 0},
            whoseBall: {type: Number, default: 0},
            receive: {type: Number, default: 0},
            dig: {type: Number, default: 0},
            set: {type: Number, default: 0},
            freeBallReceive: {type: Number, default: 0},
            ballReturn2: {type: Number, default: 0},
            ballReturn3: {type: Number, default: 0}
        },
        faults: {
            net: {type: Number, default: 0},
            ball: {type: Number, default: 0},
            handling: {type: Number, default: 0},
            under: {type: Number, default: 0},
            overTheNet: {type: Number, default: 0},
            footFault: {type: Number, default: 0},
            outOfRotation: {type: Number, default: 0},
            backRowAttack: {type: Number, default: 0}
        }
    }
});


module.exports = mongoose.model("Player", PlayerSchema);
