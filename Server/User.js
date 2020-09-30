var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: {type: String, required:true},
    password: {type: String, required:true},
    email: {type: String, required:true},
	firstname: {type: String, required:true},
    lastname: {type: String, required:true},
    token: String,
    isAdmin: {type: Boolean, required:true},
	avatar: {
        contentType: String,
        image: Buffer
    }
});


module.exports = mongoose.model('User', userSchema);