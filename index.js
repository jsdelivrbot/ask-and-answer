const express = require('express')
const path = require('path')
const {Pool} = require('pg')
const connectionString = process.env.DATABASE_URL

const pool = new Pool({
	connectionString: connectionString,
})

function get_user(id, callback) {
	console.log("Getting user from DB with id: " + id);
	var sql = 'SELECT id, username, picture_url, description FROM "user" WHERE id = $1::int';
	var params = [id];

	pool.query(sql, params, function(err, result) {
		if (err) {
			console.log("Error in query: ")
			console.log(err);
			callback(err, null);
		}
		
		console.log("Found result: " + JSON.stringify(result.rows));
		callback(null, result.rows);
	});
}

function home(req, res) {
	res.render('pages/index');
}

function profile(req, res) {
	console.log("getting id...");
	var id = req.query.id;
	
	get_user(id, function(error, result) {
		if (error || result == null || result.length != 1) {
			res.status(500).json({success: false, data: error});
		} else {
			var person = result[0];
			res.status(200).json(result[0]);
		}
	});
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

const PORT = process.env.PORT || 3000

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', home)
  .get('/profile', profile)
  .get('/browse', browse)
  .get('/sign_in', sign_in)
  .get('/sign_up', sign_up)
  .get('/question', question)
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))