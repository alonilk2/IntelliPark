var app = require('express')();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors')
mongoose.connect('mongodb://localhost/intelliparkdb');
var db = mongoose.connection;
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var Car = require('./Car');
var User = require('./User');

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Connected!!!!!!!!!");
});

app.use(bodyParser.json());	
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

app.get('/getcars', function(request, response) {
    Car.find({}, function(err, carsArr) {
        if(err) response.status(500).send(err);
        else response.send(carsArr);
    });
})
app.post('/login', async (request, response) => {
	let email = request.body.email;
	let password = request.body.password;
	const user = await User.findOne({'email': email});
	if(user){	
		bcrypt.compare(password, user.password, function(err, hash) {
		if(err) {
			response.status(404).send({message: 'wrong password'});
		}
		else {
			user.token = jwt.sign({
				email: user.email,
				id: user._id,
				isAdmin: user.isAdmin
			}, 'my#1FirStKEy', {
				expiresIn: "1h"
			})
			response.send(user);
		}
	})}
})
app.post('/logout', async (request, response) => {
	const user = request.body.user;
	user.token = null;
	response.send("logged out");
})
app.post('/register', async (request, response) => {
	const user = await User.findOne({'email': request.body.email});
	if(user){
    	response.status(402).send({ message: 'Another account is already registered with this email address.' });
	} else {
		var newuser = new User(request.body);
		bcrypt.hash(request.body.password, 10, function(err, hash) {
			if(err) return response.status(500).json({error: err});
			newuser.password = hash;
		})
		newuser.username = request.body.username;
		newuser.email = request.body.email;
		newuser.firstname = request.body.firstname;
		newuser.lastname = request.body.lastname;
		newuser.avatar = "https://thumbs.dreamstime.com/b/happy-smiling-geek-hipster-beard-man-cool-avatar-geek-man-avatar-104871313.jpg";
		newuser.save(function(error, saveduser){
			if(error) response.status(500).send({error: "Could not save user"});
			else response.send(saveduser);
		})
	}
})
 
app.post('/addcar', function(request, response){
	var car = new Car(request.body);
	car.Manufacturer = request.body.Manufacturer;
	car.ID = request.body.ID
	car.save(function(error, savedcar) {
		if(error) response.send({error:"Could not save car"});
		else response.send(savedcar);
	})
})
app.listen(3001, function() {
    console.log("first api on port 3000");
})