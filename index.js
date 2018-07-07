const express = require('express')
const session = require('express-session')
const path = require('path')
const {Pool} = require('pg')

const pool = new Pool({
	connectionString: process.env.DATABASE_URL
})

function getUser(req, res) {
	var id = req.query.id;
	
	console.log("Getting user from DB with id: " + id);
	var sql = 'SELECT id, username, picture_url, description FROM "user" WHERE id = $1::int';
	var params = [id];
	
	pool.query(sql, params, function(err, result) {
		if (err) {
			console.log("Error in query: " + err);
			res.status(500).json({success: false, data: error});
		}
	
		console.log("Found result: " + JSON.stringify(result.rows));
		res.status(200).json(result.rows[0]);
	});
}

function getQuestion(req, res) {
	var id = req.query.id;
	
	console.log("Getting question from DB with id: " + id);
	var sql = 'SELECT id, title, content, "date", category_id FROM question WHERE id = $1::int';
	var params = [id];
	
	pool.query(sql, params, function(err, result) {
		if (err) {
			console.log("Error in query: " + err);
			res.status(500).json({success: false, data: error});
		}
	
		console.log("Found result: " + JSON.stringify(result.rows));
		res.status(200).json(result.rows[0]);
	});
}

function getCategories(req, res) {
	pool.query('SELECT name FROM category', function(error, result) {
		if (error) {
			res.status(500).json({success: false, data: error});
		} 
		else {
			res.status(200).json(result.rows);
		}
	});
}

function home(req, res) {
	res.render('pages/index');
}

function profile(req, res) {
	res.render('pages/profile');
}

function myProfile(req, res) {
	ssn = req.session;
	
	if (ssn.userID) {
		res.render('pages/profile?userID=' + userID);
	}
	else {
		res.render('pages/sign_in');
	}
}

function browse(req, res) {
	res.render('pages/browse');
}

function sign_in(req, res) {
	res.render('pages/sign_in');
}

function sign_up(req, res) {
	res.render('pages/sign_up');
}

function question(req, res) {
	res.render('pages/question');
}

function ask(req, res) {
	res.render('pages/ask');
}

const PORT = process.env.PORT || 3000

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', home)
  .get('/profile', profile)
  .get('/myProfile', myProfile)
  .get('/browse', browse)
  .get('/sign_in', sign_in)
  .get('/sign_up', sign_up)
  .get('/question', question)
  .get('/ask', ask)
  .get('/getCategories', getCategories)
  .get('/getQuestion', getQuestion)
  .get('/getUser', getUser)
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))