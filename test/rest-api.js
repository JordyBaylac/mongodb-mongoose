let chai = require('chai');
let should = chai.should();
let expect = chai.expect;
let chaiHttp = require('chai-http');

let config = require('config');

chai.use(chaiHttp);

//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

describe('REST API', function(){

    before(function(){
        require('../server');
    });

    let port = config.get('serverConfigTest').port;
    let api = `http://localhost:${port}`;

    it('default route (/) should fail with 404 status', function(done) { // <= Pass in done callback
            chai.request(api)
                .get('/')
                .end(function(err, res) {
                    should.exist(err, 'default / not defined');
                    expect(res).to.have.status(404);
                    done();                               // <= Call done to signal callback end
                });
    });

    context('/Students', function(){
        

        it('should return json array with students', function(done) { // <= Pass in done callback
            chai.request(api)
                .get('/Students')
                .end(function(err, res) {
                    
                    should.not.exist(err, '/Students must be defined');
                    should.exist(res, 'response should exist');
                    
                    expect(res).to.have.status(200);
                    expect(res).to.have.header('content-type', 'application/json; charset=utf-8');
                    expect(res).to.have.property('body').and.be.an('array');

                    done();                            
                });
        });



    });

});