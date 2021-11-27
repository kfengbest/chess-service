const mongoose = require('mongoose');

const MoveSchema = mongoose.Schema({
    order: Number,
    player: String,
    piece: String,
    from: String,
    to: String
})

const Move = mongoose.model("Move", MoveSchema);

const GameSchema = mongoose.Schema({
    u1 : String,
    u2 : String,
    date: { type: Date, default: Date.now },
    result: String,
    board: String,
    moves: [MoveSchema]
})

const Game = mongoose.model("Game", GameSchema);

module.exports = {
    Game, Move
}