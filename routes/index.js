const express = require('express');

const router = express.Router();

router.post('/games', (req, res, next) => { res.send("post /games")});
router.get('/games/:id', (req, res, next) => { res.send("get /games/:id")});
router.get('/games/:id/potentials', (req, res, next) => { res.send("get /games/:id/potentials")});
router.post('/games/:id/moves', (req, res, next) => { res.send("post /games/:id/moves")});
router.get('/games/:id/moves', (req, res, next) => { res.send("get /games/:id/moves")});

module.exports = router;