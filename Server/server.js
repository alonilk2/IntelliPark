var app = require('express')();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors')
var multer = require('multer')
mongoose.connect('mongodb://localhost/intelliparkdb');
var db = mongoose.connection;
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var Car = require('./Car');
var User = require('./User');
const path = "uploads";
const fs = require('fs');

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Connected!!!!!!!!!");
});
   
app.use(bodyParser.json());	
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, path);
	},
	filename: (req, file, cb) => {
		cb(null, file.originalname);
	}
});

const fileFilter = (req, file, cb) => {
	if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
		cb(null, true);
	} else {
		cb("Type file is not access", false);
	}
};

const upload = multer({
	storage,
	fileFilter,
	limits: 1024 * 1024 * 5
});
app.post('/getCars', function(req, res) {
    Car.find({ email: req.body.email }, function(err, carsArr) {
        if(err) res.status(500).send(err);
        else {res.send(carsArr);}
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
			response.send({
				"email":user.email,
				"token":user.token,
				"firstname":user.firstname,
				"lastname":user.lastname
			});
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

app.post('/updateCar', async function(request, response){
	await Car.deleteOne({_id: request.body.carObj._id}, function(err) {
		if(err) return console.log("No previous car entry found");
	});
	var newcar = new Car(request.body.carObj);
	if(request.body.Manufacturer) newcar.Manufacturer = request.body.Manufacturer;
	if(request.body.ID) newcar.ID = request.body.ID;
	if(request.body.color) newcar.color = request.body.color;
	if(request.body.Model) newcar.Model = request.body.Model;
	if(request.body.year) newcar.year = request.body.year;
	newcar.save(function(error, savedcar) {
		if(error) response.send({error:error});
		else response.send(savedcar);
	})
})
app.post('/updateImg', upload.single('img'), async function (req, res) {
	var car = req.body.carid;
	console.log("carid:"+ car);
	const carIns = await Car.findOne({'_id': car}, (err, res) => {
		if(err)
			return console.log("error:"+err);
		else return res;
	});
	var img = fs.readFileSync(req.file.path);
	var encode_image = img.toString('base64');
	var finalImg = {
		 contentType: req.file.mimetype,
		 image: new Buffer.from(encode_image, 'base64')
	};
	carIns.imgurl = finalImg;
	console.log(carIns);
	carIns.save((err, doc)=>{
		if(err) return res.status(500).send(err);
		return res.send(doc);
	});
})
app.post('/upload-file', upload.single('avatar'), async function (req, res) {
	var email = req.body.user;
	const user = await User.findOne({'email': email});
	var img = fs.readFileSync(req.file.path);
	var encode_image = img.toString('base64');
	var finalImg = {
		 contentType: req.file.mimetype,
		 image: new Buffer.from(encode_image, 'base64')
	};
	user.avatar = finalImg;
   	user.save((err)=>{
		if(err) return res.status(500).send(err);
		return res.send(finalImg);
	});
	/* WORKING WAY FOR UPLOADING FILES*/
	/*var tmp_path = req.file.path;
	var target_path = 'uploads/' + req.file.originalname;
	var src = fs.createReadStream(tmp_path);
	var dest = fs.createWriteStream(target_path);
	src.pipe(dest);
	src.on('end', function() { res.json('complete'); });
	src.on('error', function(err) { res.json('error'); });*/
})
app.post('/load-avatar', async function(req, res) {
	var email = req.body.email;
	const user = await User.findOne({'email': email});
	if(user) {
		return res.send(user.avatar);
	}
	else return res.status(500).send("User not found.");
})
app.listen(3001, function() {
    console.log("first api on port 3000");
})
