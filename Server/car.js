var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var carSchema = new Schema({
    Manufacturer:String,
    ID:Number,
    imgurl:String
});


module.exports = mongoose.model('Car', carSchema);