class GameController {
    constructor() {
    }

    async newGame(req, res) {
        const game = {};
        const chess = {};
        const board = {};

        return res.json({game, board});
    }

    async getGameById(req, res) {
        let id = req.params.id;

        try {
            const game = {};
    
            res.send(game);
        } catch(e) {
            console.log(e.message);
            res.sendStatus(500) && next(error);
        }
    }

    async legalMoves(req, res) {
        let id = req.params.id;

        try {
            const game = {};
    
            res.send(game);
        } catch(e) {
            console.log(e.message);
            res.sendStatus(500) && next(error);
        }
    }

    async makeMove(req, res) {
        let id = req.params.id;

        try {
            const game = {};
    
            res.send(game);
        } catch(e) {
            console.log(e.message);
            res.sendStatus(500) && next(error);
        }
    }

    async getHistoryMoves(req, res) {
        let id = req.params.id;

        try {
            const moves = [];
    
            res.send(game);
        } catch(e) {
            console.log(e.message);
            res.sendStatus(500) && next(error);
        }
    }
}

module.exports = {
    GameController
}