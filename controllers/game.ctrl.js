const {Game, Move} = require('../models/game');

class GameController {
    constructor() {
    }

    async newGame(req, res) {

        let game = new Game({
            u1 : 'W',
            u2 : 'B',
            result: 'new',
            board: 'RNBKQBNRPPPPPPPOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOpppppppprnbkqnr',
            moves: []
        })

        let newMove = new Move({
            order: game.moves.length+1,
            player: 'W',
            piece: 'R',
            from: 'e1',
            to: 'e2'
        })

        await newMove.save();

        game.moves.push(newMove);
        await game.save();

        return res.json({game});
    }

    async getGameById(req, res) {

        try {
            const game = await Game.findOne({ _id: req.params.id});
            return res.json({game});

        } catch(e) {
            console.log(e.message);
            res.sendStatus(500) && next(error);
        }
    }

    async legalMoves(req, res) {

        try {
            const game = await Game.findOne({ _id: req.params.id});
            let moves = game.moves;
            return res.json({'moves': moves});

        } catch(e) {
            console.log(e.message);
            res.sendStatus(500) && next(error);
        }
    }

    async makeMove(req, res) {

        try {
            let from = req.params.from;
            let to = req.params.to;

            const game = await Game.findOne({ _id: req.params.id});

            let newMove = new Move({
                order: game.moves.length+1,
                player: 'W',
                piece: 'R',
                from: from,
                to: to
            })

            game.moves.push(newMove);
            await game.save();

            return res.json({game});
        } catch(e) {
            console.log(e.message);
            res.sendStatus(500) && next(error);
        }
    }

    async getHistoryMoves(req, res) {
        
        try {
            const game = await Game.findOne({ _id: req.params.id});
    
            return res.json({'moves': game.moves});
        } catch(e) {
            console.log(e.message);
            res.sendStatus(500) && next(error);
        }
    }
}

module.exports = {
    GameController
}