const {Game, Move} = require('../models/game');
const {Chess} = require('../services/chess');

class GameController {
    constructor() {
    }

    async newGame(req, res) {
        try {
            let chess = new Chess();

            let game = new Game({
                u1 : 'W',
                u2 : 'B',
                result: 'new',
                board: JSON.stringify(chess.getBoard()),
                print: chess.printBoard(),
                moves: []
            })

            await game.save();
            return res.json({game});
        } catch(e) {
            console.log(e.message);
            return res.status(500).json({ error: e.message });
        }
    }

    async getGameById(req, res) {

        try {
            const game = await Game.findOne({ _id: req.params.id});
            return res.json({game});

        } catch(e) {
            console.log(e.message);
            return res.status(404).json({ error: e.message });
        }
    }

    async legalMoves(req, res) {

        try {
            
            let game = await Game.findOne({ _id: req.params.id});
            let chess = new Chess(JSON.parse(game.board));

            let from = req.params.from;
            let sqaure = chess.getSquare(from);

            let legalMoves = chess.getLegalMoves(sqaure.color, sqaure.piece, from);
            return res.json({'legalMoves': legalMoves});

        } catch(e) {
            console.log(e.message);
            return res.status(500).json({ error: e.message });
        }
    }

    async makeMove(req, res) {

        try {
            let from = req.params.from;
            let to = req.params.to;

            const game = await Game.findOne({ _id: req.params.id});
            const chess = new Chess(JSON.parse(game.board));
            const {color, piece} = chess.getSquare(from);
            let moveResult = chess.move(color, from, to);

            let newMove = new Move({
                order: game.moves.length+1,
                player: color,
                piece: piece,
                from: from,
                to: to,
                result: moveResult
            })
            
            game.board = JSON.stringify(chess.getBoard());
            game.print = chess.printBoard();
            game.moves.push(newMove);

            await game.save();

            return res.json({game});
        } catch(e) {
            console.log(e.message);
            return res.status(500).json({ error: e.message });
        }
    }

    async getHistoryMoves(req, res) {
        
        try {
            const game = await Game.findOne({ _id: req.params.id});
    
            return res.json({'moves': game.moves});
        } catch(e) {
            console.log(e.message);
            return res.status(500).json({ error: e.message });
        }
    }
}

module.exports = {
    GameController
}