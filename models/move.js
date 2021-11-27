const mongoose = require('mongoose');

const MoveSchema = mongoose.Schema({
    order: Number,
    player: String,
    piece: String,
    from: String,
    to: String
})

const Move = mongoose.model("Move", MoveSchema);

module.exports = {
    Move
}