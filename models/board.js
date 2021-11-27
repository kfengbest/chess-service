const mongoose = require('mongoose');

const BoardSchema = mongoose.Schema({
    u1 : String,
    u2 : String,
    date: { type: Date, default: Date.now },
    result: String,
    board: String,
//    moves: [MoveSchema],
})

const Board = mongoose.model("Board", BoardSchema);

module.exports = {
    Board
}