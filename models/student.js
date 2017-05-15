let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let courseSchema = new Schema({
    description: { type: String, maxlength: 100, required: true},
    mark: { type: Number, min: 0},
});

let gradeSchema = new Schema({
    description: { type: String, maxlength: 100, required: true},
    average: { type: Number, min: 0},
    courses: [courseSchema]
});

let studentSchema = new Schema({
    fullname: { type: String, maxlength: 100, required: true},
    average: { type: Number, min: 0},
    grades: [gradeSchema]
});

var Student = mongoose.model('Student', studentSchema, 'students');

module.exports = {
    Student: Student,
    StudentSchema: studentSchema
};