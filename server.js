var express = require("express");
var app = express();
var path = require("path");
var bodyParser= require("body-parser");
var fs = require('fs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, "./node_modules")));
// Setting our Views Folder Directory
app.use(express.static(path.join(__dirname, "./client")));

//use pseudo path to equal the full path
app.use('/lightgallerycss', express.static(__dirname + '/node_modules/lightgallery/dist/css')); // redirect lightgallery
app.use('/lightgalleryjs', express.static(__dirname + '/node_modules/lightgallery/dist/js')); // redirect lightgallery
app.use('/lgthumbnailjs', express.static(__dirname + '/node_modules/lg-thumbnail/dist')); // redirect lightgallery
app.use('/lgfullscreenjs', express.static(__dirname + '/node_modules/lg-fullscreen/dist')); // redirect lightgallery

// Setting our Views Folder Directory for EJS
// app.set('views', path.join(__dirname, './views'));
// Setting our View Engine set to EJS
// app.set('view engine', 'ejs');

// email: fernyhoughwedding@zoho.com
var nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
// var transporter = nodemailer.createTransport('smtps://pokemongomapper%40gmail.com:pikachu1@smtp.gmail.com');
var ses = require('nodemailer-ses-transport');
var transporter = nodemailer.createTransport({
    host: 'smtp.zoho.com',
    port: 465,
    secure: true, // use SSL
    auth: {
        user: 'fernyhoughwedding@zoho.com',
        pass: 'wyli4792'
    }
});


// app.get('/', function (req,res){
//   console.log(req.body)
// 	res.render("index");
//  })

//read file works too
// var imgFolder = './client/img';
// fs.readdir(imgFolder, function (err, files) {
//   files.forEach(function(file) {
//     console.log(file);
//   });
// })

app.get('/images', function(req, res) {
  var imgs = [];
  var img_path = path.join(__dirname, './client/img/upload');
  fs.readdirSync(img_path).forEach(function(file){
    // imgs.push(file);
    if (file !== '.DS_Store') {
      imgs.push('img/upload/'+ file);
    }
  });
  res.json({result: imgs});
})


app.post('/rsvp', function (req,res){
	console.log('rsvp submitted');
	console.log(req.body)
	// setup e-mail data with unicode symbols
		if(req.body.name.length > 2){
			console.log('mail options');
			var mailOptions = {
  				from: '"RSVP" <fernyhoughwedding@zoho.com>',
			    to: 'tynguyen06@gmail.com', // list of receivers
			    subject: 'Deanna & Wylie Wedding RSVP', // Subject line
			    text: 'Hey Guys', // plaintext body
			    html: "<table style='border: 1px solid black;border-collapse: collapse;width: 100%;'><tr><th style='border: 1px solid black;height: 50px;text-align: left;padding: 15px;'>Name</th><th style='border: 1px solid black;height: 50px;text-align: left;padding: 15px;'>RSVP</th><th style='border: 1px solid black;height: 50px;text-align: left;padding: 15px;'># of Guests</th><th style='border: 1px solid black;height: 50px;text-align: left;padding: 15px;'>Email</th><th style='border: 1px solid black;height: 50px;text-align: left;padding: 15px;'>Address</th><th style='border: 1px solid black;height: 50px;text-align: left;padding: 15px;'>Phone</th><th style='border: 1px solid black;height: 50px;text-align: left;padding: 15px;'>Song Request</th><th style='border: 1px solid black;height: 50px;text-align: left;padding: 15px;'>Comments</th></tr><tr><td style='border: 1px solid black;padding: 15px;text-align: left;'>" + req.body.name + "</td><td style='border: 1px solid black;padding: 15px;text-align: left;'>" + req.body.rsvp + "</td><td style='border: 1px solid black;padding: 15px;text-align: left;'>" + req.body.guests + "</td><td style='border: 1px solid black;padding: 15px;text-align: left;'>" + req.body.email + "</td><td style='border: 1px solid black;padding: 15px;text-align: left;'>" + req.body.address + "</td><td style='border: 1px solid black;padding: 15px;text-align: left;min-width: 80px;'>" + req.body.phone + "</td><td style='border: 1px solid black;padding: 15px;text-align: left;'>"+ req.body.song + "</td><td style='border: 1px solid black;padding: 15px;text-align: left;'>" + req.body.comments + "</td></tr></table>"

			    // html:  "<table style='border-collapse: collapse; border: 1px solid black;width: 250px;'><tr><th style='text-align: left;border: 1px solid black;width: 250px;'>Name</th><th style='text-align: left;border: 1px solid black;width: 250px;'>RSVP</th><th style='text-align: left;border: 1px solid black;width: 250px;'># of Guests</th><th style='text-align: left;border: 1px solid black;width: 250px;'>Email</th><th style='text-align: left;border: 1px solid black;width: 250px;'>Address</th><th style='text-align: left;border: 1px solid black;width: 250px;'>Phone</th><th style='text-align: left;border: 1px solid black;width: 250px;'>Song Request</th><th style='text-align: left;border: 1px solid black;width: 250px;'>Comments</th></tr><tr><td>" + req.body.name + "</td><td>" + req.body.rsvp + "</td><td>" + req.body.guests + "</td><td>" + req.body.email + "</td><td>" + req.body.address + "</td><td>" + req.body.phone + "</td><td>"+ req.body.song + "</td><td>" + req.body.comments + "</td></tr></table>"// html body
			};
			//send mail with defined transport object
			transporter.sendMail(mailOptions, function(error, info){
			    if(error){
			        return console.log(error);
			    }
			    console.log('Message sent: ' + info.response);
			});
		}
		res.redirect('/');
});

// var port = process.env.PORT || 5000;
var port = 8000;

var server = app.listen(port, function(){
	console.log("********** PORT " + port + " PORT **********")
});
