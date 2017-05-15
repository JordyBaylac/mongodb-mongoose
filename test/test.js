let chai = require('chai');
let expect = chai.expect;
let should = chai.should();

describe('Array', function() {

    before(function() {
        // runs before all tests in this block
    });

    after(function() {
        // runs after all tests in this block
    });

    beforeEach(function() {
        // runs before each test in this block
    });

    afterEach(function() {
        // runs after each test in this block
    });

    describe('#indexOf()', function() {
        it('should return -1 when the value is not present', function() {
            let operation = [1,2,3].indexOf(4);
            expect(operation).to.exist.and.to.be.a('number').and.be.equal(-1);
            operation.should.exist.and.be.equal(-1);
        });
    });

});