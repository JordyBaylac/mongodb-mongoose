
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let studentSchema = require('./student').StudentSchema;

let parentSchema = new Schema({
    fullname: { type: String, maxlength: 100, required: true},
    childrens: [studentSchema]
});

var Parent = mongoose.model('Parent', parentSchema, 'parents');

module.exports = {
    Parent: Parent,
    ParentSchema: parentSchema
};
