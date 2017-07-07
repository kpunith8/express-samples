var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
var app = express();

app.set('view engine', 'pug');
app.set('views', './views');

// for parsing application/json
app.use(bodyParser.json()); 

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true })); 

// for parsing multipart/form-data
app.use(upload.array()); 
app.use(express.static('public'));

// var things = require('./things.js');

//Sample get and reading input

/**
 app.get('/hello', function(req, res) {
    res.send("Hello world! How are you");
});

app.post('/hello', function(req, res){
    res.send("You just called the post method at '/hello'!\n");
});

app.all('/test', function(req, res){
    res.send("HTTP method doesn't have any effect on this route!");
});

app.use('/things', things);

app.get('/:id', function(req, res){
    res.send('The id you specified is ' + req.params.id);
});

// Passing the name and id
 app.get('/things/:name/:id', function(req, res) {
    res.send('id: ' + req.params.id + ' and name: ' + req.params.name);
 });


// Use regular expression read id of size 5
 app.get('/things/:id([0-9]{5})', function(req, res){
    res.send('Regular expression - id: ' + req.params.id);
});

// Other routes here
 app.get('*', function(req, res){
    res.send('Sorry, this is an invalid URL.');
});

*/

//Loading views using pug template parser

/**
app.set('view engine', 'pug');
app.set('views','./views'); // needs to create views folder and add the file first_view.pug

// To serve static files - create a folder called 'public'
app.use(express.static('public'));

app.get('/first_template', function(req, res){
    res.render('first_view');
});

// Passing values to templates
app.get('/dynamic_view', function(req, res){
   res.render('dynamic', {
       name: "TutorialsPoint", 
       url: "http://www.tutorialspoint.com"
    });
});
*/

// Form Processing using body-parser and multer 
// body-parser(for parsing JSON and url-encoded data) and multer(for parsing multipart/form data)

/** 

app.get('/', function(req, res){
   res.render('form');
});

app.set('view engine', 'pug');
app.set('views', './views');

// for parsing application/json
app.use(bodyParser.json()); 

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true })); 
//form-urlencoded

// for parsing multipart/form-data
app.use(upload.array()); 
app.use(express.static('public'));

app.post('/', function(req, res){
   console.log(req.body);
   res.send("recieved your request!");
});
*/

// MongoDB

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/my_db');

var personSchema = mongoose.Schema({
   name: String,
   age: Number,
   nationality: String
});

var Person = mongoose.model("Person", personSchema);

app.get('/person', function(req, res){
   res.render('person');
});

app.post('/person', function(req, res){
   var personInfo = req.body; //Get the parsed information
   
   if(!personInfo.name || !personInfo.age || !personInfo.nationality){

      res.render('show_message', {
         message: "Sorry, you provided worng info", type: "error"});
   } else {
      var newPerson = new Person({
         name: personInfo.name,
         age: personInfo.age,
         nationality: personInfo.nationality
      });
		
      newPerson.save(function(err, Person){
         if(err)
            res.render('show_message', {message: "Database error", type: "error"});
         else
            res.render('show_message', {
               message: "New person added", type: "success", person: personInfo});
      });
   }
});

Person.find(function(err, response){
   console.log(response);
});

app.listen(3000);