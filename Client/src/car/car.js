var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var carSchema = new Schema({
    Manufacturer: {
        type: String,
        enum: ['Audi', 'Alfa-Romeo', 'Aston Martin', 'B.M.W', 'Buick', 'Cadillac', 'Chevrolet', 'Chrysler', 'Citroen',
        'Dodge', 'Dacia', 'Ferrari', 'Fiat', 'Ford', 'Honda', 'Hyundai', 'Infiniti', 'Jaguar', 'Jeep',
        'Kia', 'Lamborghini', 'Land Rover', 'Lexus', 'Maserati', 'Mazda', 'Mercedes', 'Mini', 'Mitsubishi',
        'Nissan', 'Opel', 'Peugeot', 'Porsche', 'Renault', 'Skoda', 'Smart', 'Subaru', 'Suzuki', 'Seat', 'Toyota', 'Volkswagen', 'Volvo']
    },
    Model:String,
    ID:Number,
    year:Date,
    imgurl: {
        contentType: String,
        image: Buffer
    },
    email:String,
    color:String
});


module.exports = mongoose.model('Car', carSchema);