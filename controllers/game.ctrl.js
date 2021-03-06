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
                nextPlayer: chess.getNextPlayer(),
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
            if(!chess.isInBoard(from)) {
                return res.status(400).json({ error: 'Invalid position' });
            }

            let sqaureFrom = chess.getSquare(from);
            let legalMoves = chess.getLegalMoves(sqaureFrom.color, sqaureFrom.piece, from);
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
            const chess = new Chess(JSON.parse(game.board), game.nextPlayer);
            if(!chess.isInBoard(from) || !chess.isInBoard(to)) {
                return res.status(400).json({ error: 'Invalid position' });
            }

            const {color, piece} = chess.getSquare(from);
            let moveResult = chess.move(chess.getNextPlayer(), from, to);
            if(moveResult) {
                let newMove = new Move({
                    order: game.moves.length+1,
                    player: color,
                    piece: piece,
                    from: from,
                    to: to,
                    result: moveResult.result
                });
                game.board = JSON.stringify(chess.getBoard());
                game.nextPlayer = chess.getNextPlayer();
                game.print = chess.printBoard();
                game.moves.push(newMove);
                await game.save();
                return res.json({game});
            } else {
                return res.status(400).json({ 
                    result: "Invalid move",
                    nextPlayer: chess.getNextPlayer(),
                    from : {
                        color : chess.getBoard()[from].color,
                        piece : chess.getBoard()[from].piece,
                        position : from
                    },
                    to : {
                        color : chess.getBoard()[to].color,
                        piece : chess.getBoard()[to].piece,
                        position : to
                    }
                });
            }
            
        } catch(e) {
            console.log(e.message);
            return res.status(500).json({ error: e.message });
        }
    }

    async getHistoryMoves(req, res) {
        return res.status(404).json({ error: "not implemented yet" });
    }
}

module.exports = {
    GameController
}