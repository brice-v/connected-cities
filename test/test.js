var assert = require('assert');

var { load_test_file, are_these_cities_connected } = require('../src/index.js')

before(async () => {await load_test_file()});

describe('Are 2 Cities Connected', () => {
    it('should return true for cities that are connected', () => {
        assert.equal(are_these_cities_connected("New York", "Croton-Harmon"), true);
        assert.equal(are_these_cities_connected("Boston", "Croton-Harmon"), true);
        assert.equal(are_these_cities_connected("New York", "Boston"), true);
    });
});

// describe('anotherThing', () => {
//     it('should return 1', () => {
//       assert.equal(anotherThing(), 1);
//     });
// });
