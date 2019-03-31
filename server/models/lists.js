var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var listSchema = new Schema({
    "title": String,
    "children": [{
        "link": String,
        "title": String,
        "description": String,
    }]
})

module.exports = mongoose.model('List', listSchema)