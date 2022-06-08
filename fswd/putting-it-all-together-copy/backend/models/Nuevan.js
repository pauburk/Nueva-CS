// grab the things we need
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create a schema
const nuevanSchema = new Schema({
    name: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        enum: ["faculty", "staff", "parent", "student"],
        default: "faculty"
    },
    grade: {
      type: Number,
      min: 9,
      max: 12,
    },
});


module.exports = mongoose.model("Nuevan", nuevanSchema);
