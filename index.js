const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser');
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
			res.status(500).json({success: false, data: err});
		}
	
		console.log("Found result: " + JSON.stringify(result.rows));
		res.status(200).json(result.rows[0]);
	});
}

function getQuestion(req, res) {
	var id = req.query.id;
	var categoryId = req.query.categoryId;
	
	console.log("categoryId is: " + categoryId);
	
	var sql = 'SELECT id, title, content, "date", category_id, user_id FROM question WHERE ($1::int IS NULL OR id = $1::int) AND ($2::int IS NULL OR category_id = $2::int)';
	var params = [id, categoryId];
	
	pool.query(sql, params, function(err, result) {
		if (err) {
			console.log("Error in query: " + err);
			res.status(500).json({success: false, data: err});
		}
		else {
			console.log("Found result: " + JSON.stringify(result.rows));
			res.status(200).json(result.rows);
		}
	});
}

function getCategories(req, res) {
	pool.query('SELECT id, name FROM category', function(error, result) {
		if (error) {
			res.status(500).json({success: false, data: error});
		} 
		else {
			res.status(200).json(result.rows);
		}
	});
}

function addUser(req, res) {
	var user = req.body.user;
	var pass = req.body.pass;
	var passVer = req.body.passVer;
	
	console.log("adding user...");
	
	var sql = 'INSERT INTO "user" (username, password) VALUES ($1::varchar, $2::varchar)';
	var params = [user, pass];
	
	pool.query(sql, params, function(err, result) {
		if (err) {
			res.status(500).json({success: false, data: err});
		}
		else {
			res.redirect('/sign_in');
			res.end();
		}
	});
}

function updateUser(req, res) {
	ssn = req.session;
	var userID = ssn.userID;
	
	if (userID) {
		var picture_url = req.body.picture_url;
		var description = req.body.description;
	
		var sql = 'UPDATE "user" SET picture_url = $1::varchar, description = $2::varchar WHERE id = $3::int';
		var params = [picture_url, description, userID];
	
		pool.query(sql, params, function(err, result) {
			if (err) {
				res.redirect('/updateProfile');
			}
			else {
				res.redirect('/myProfile');
				res.end();
			}
		});
	}
	else {
		res.redirect('/updateProfile');
	}
}

function updateProfile(req, res) {
	ssn = req.session;
	
	if (ssn.userID) {
		res.render('pages/updateProfile');
	}
	else {
		ssn.initialPage = 'updateProfile';
		res.redirect('/sign_in');
	}
}

function signInUser(req, res) {
	var user = req.body.user;
	var pass = req.body.pass;
	
	var sql = 'SELECT id, username, password FROM "user" WHERE username = $1::varchar AND password = $2::varchar';
	var params = [user, pass];
	
	pool.query(sql, params, function(err, result) {
		if (err || result.rows.length > 1) {
			res.status(500).json({success: false, data: err});
		}
		else {
			ssn = req.session;
			ssn.userID = result.rows[0].id;
			res.redirect('/' + ssn.initialPage);
			res.end();
		}
	})
}

function home(req, res) {
	res.render('pages/index');
}

function profile(req, res) {
	var id = req.query.id;
	ssn = req.session;
	
	if (id == ssn.userID) {
		res.render('pages/profile', {id: id, ownProfile: true});
	}
	else {
		res.render('pages/profile', {id: id, ownProfile: false})
	}
}

function myProfile(req, res) {
	ssn = req.session;
	
	if (ssn.userID) {
		res.redirect('/profile?id=' + ssn.userID);
	}
	else {
		ssn.initialPage = 'myProfile';
		res.redirect('/sign_in');
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
	var id = req.query.id;
	res.render('pages/question', {id: id});
}

function ask(req, res) {
	ssn = req.session;
	
	if (ssn.userID) {
		res.render('pages/ask');
	}
	else {
		ssn.initialPage = 'ask';
		res.redirect('/sign_in');
	}
}

const PORT = process.env.PORT || 3000

express()
  .use(express.static(path.join(__dirname, 'public')))
  .use(session({ resave: true, secret: '123456' , saveUninitialized: true }))
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
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
  .get('/updateProfile', updateProfile)
  .post('/signInUser', signInUser)
  .post('/addUser', addUser)
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))