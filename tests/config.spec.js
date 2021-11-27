const config = require('config');

describe('test config', () => {
    it('Server config exist', () => {
        expect(config.has("server")).toBe(true);
    });
    
    it('Default config exist', () => {
        expect(config.has("server.port")).toBe(true);
        expect(config.has("server.host")).toBe(true);
    });
})
