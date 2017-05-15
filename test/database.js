let chai = require('chai');
let expect  = chai.expect;
let should = chai.should();

let mongoose = require('mongoose');
let config = require('config');
let Student = require('./../models/student').Student;

describe('DATABASE', function(){

    before(function(){
            let dbConfig = config.get('dbConfigTest');
            let URI = 'mongodb://' + dbConfig.host + ':' + dbConfig.port + '/' + dbConfig.name;
            mongoose.Promise = global.Promise; //to avoid promises warning
            mongoose.connect(URI, () => {});
    });

    after(function(done){
        if(mongoose.connection){
            mongoose.connection.close(done);
        }
    });

    describe('student\'s collection', function() {

        context('creating student', function(){

            let student = new Student({
                fullname: 'Jordy Baylac',
                average: 85,
                grades: []
            });

            after(function(done){
                Student.remove({},done);
            });

            it('should be stored in db', function(done){
                student.save(function (err, document) {
                    should.not.exist(err, 'no error when saving student');
                    expect(document).to.have.property('_id');
                    done();
                });
            });

            it('should exist in db', function(done){
                Student.findOne({fullname: student.fullname}, function(err, result){
                    should.not.exist(err, 'no error when finding student');
                    expect(result).to.have.property('fullname').and.equal(student.fullname);
                    expect(result).to.have.property('average').and.equal(student.average);
                    done();
                });
            });

        }); // END Context 'creating student'



        context('removing student', function(){

            let student;

            beforeEach(function(done){
                student = new Student({
                    fullname: 'Jordy Baylac',
                    average: 85,
                    grades: []
                });

                student.save(done);
            });

            afterEach(function(done){
                Student.remove({},done);
            });

            it('specific instance should be removed correctly', function(done){
                student.remove(function(err){
                    should.not.exist(err, 'no error when removing instance student');
                    done();
                });
            });

            it('should be removed correnctly by ID', function(done){
                Student.findOne({fullname: student.fullname}, function(err, result){

                    should.not.exist(err, 'no error when finding student');
                    // should.exist(document, 'document resultant of finding should exist');
                    expect(result).to.exist.and.have.property('fullname');
                    
                    Student.remove({_id: result._id}, function(err){
                        should.not.exist(err, 'no error when removing student');
                        done();
                    });
                });
            });

            it('should not exist after being removed', function(done){
                let _fullname = student.fullname;
                Student.remove({fullname: _fullname},function(err){
                    
                    should.not.exist(err, 'no error when removing instance student');
                    
                    Student.findOne({fullname: _fullname}, function(err2, document){
                        should.not.exist(document, 'document resultant of finding should not exist');
                        done();
                    });
                });  
            });

        }); // END Context 'removing student'

    }); // END 'student's collection'

});


