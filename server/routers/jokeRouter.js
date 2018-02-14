const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
const bodyParser = require('body-parser');
let jokeArray=[];

router.get('/', function(request, response){
  console.log('injoke get');
  const sqlText = 'SELECT * FROM jokes';
  pool.query(sqlText)
  .then(function(result){
    console.log('got result', result.rows);
    jokeArray=result.rows;
    response.send(result.rows);
  })
  .catch(function(error){
    console.log('error on GET', error);
    response.sendStatus(500);
  })
})//end get joke router

router.post('/add', function(request, response){
  const joke = request.body;
  const sqlText = `INSERT INTO jokes
      (whos_joke, joke_question, punch_line, date_added, funniness)
      VALUES ($1, $2, $3, $4, $5)`;
    pool.query(sqlText, [joke.whos_joke, joke.joke_question, joke.punch_line, joke.date_added, joke.funniness])
    .then( (result) => {
      console.log('added joke', result);
      response.sendStatus(201);
    })
    .catch( (error) => {
      console.log('error adding joke', error);
    })
})//end post joke router

router.post('/delete', function(request, response){
  const indexToDelete = request.body.data;
  idToDelete = jokeArray[indexToDelete].id;
  const sqlText = `DELETE FROM jokes WHERE id = ${idToDelete}`;
  pool.query(sqlText)
  .then(function(result){
    console.log('deleted', idToDelete);
    response.sendStatus(200);
  })
  .catch(function(error){
    console.log('error on delete', error);
    response.sendStatus(500);
  })
})//end delete joke router


module.exports = router;
