const {Chess} = require('../services/chess');

describe("Test chess logic", () => {
    it('Should create default board', () => {
        let chess = new Chess();
        expect(chess.getNextPlayer()).toBe('B');
    });
})