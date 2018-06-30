const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 3000

var num1 = process.argv[2];
var oper = process.argv[3];
var num2 = process.argv[4];
var result;

function compute(req, res) {
	/*
	var num1 = req.query.num1;
	var num2 = req.query.num2;
	var oper = req.query.oper;
	*/
	
	res.render('pages/index');
	
	/*
	result = eval(num1 + oper + num2);
	console.log('Result is: ' + result);
	res.render('index', {result: result});
	*/
}

function next(req, res) {
	var num1 = req.query.num1;
	var num2 = req.query.num2;
	var oper = req.query.oper;
	console.log(num1);
	console.log(num2);
	console.log(num3);
	result = eval(num1 + oper + num2);
	
	res.render('pages/result', {result: result});
}

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/math', compute)
  .get('/result', next)
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))