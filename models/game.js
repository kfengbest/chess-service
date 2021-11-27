const mongoose = require('mongoose');

const GameSchema = mongoose.Schema({
    u1 : String,
    u2 : String,
    date: { type: Date, default: Date.now },
    result: String,
    board: String,
//    moves: [MoveSchema],
})

const Game = mongoose.model("Game", GameSchema);

module.exports = {
    Game
}