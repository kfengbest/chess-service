const express = require('express');
const router = express.Router();

const {GameController} = require('../controllers/game.ctrl');
const gameCtrl = new GameController();

router.post('/games', gameCtrl.newGame);
router.get('/games/:id', gameCtrl.getGameById);
router.get('/games/:id/legal-moves/:from', gameCtrl.legalMoves);
router.post('/games/:id/moves/:from/:to', gameCtrl.makeMove);
router.get('/games/:id/history-moves', gameCtrl.getHistoryMoves);

module.exports = router;