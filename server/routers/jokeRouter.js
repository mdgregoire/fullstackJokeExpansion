const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
const bodyParser = require('body-parser');

router.get('/', function(request, response){
  console.log('injoke get');
  const sqlText = 'SELECT * FROM jokes ORDER BY id asc';
  pool.query(sqlText)
  .then(function(result){
    console.log('got result', result.rows);
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
      (whos_joke, joke_question, punch_line, funniness)
      VALUES ($1, $2, $3, $4)`;
    pool.query(sqlText, [joke.whos_joke, joke.joke_question, joke.punch_line, joke.funniness])
    .then( (result) => {
      console.log('added joke', result);
      response.sendStatus(201);
    })
    .catch( (error) => {
      console.log('error adding joke', error);
    })
})//end post joke router

router.delete('/delete', function(request, response){
  const idObjectDelete = request.body.data;
  const sqlText = `DELETE FROM jokes WHERE id = ${idObjectDelete}`;
  pool.query(sqlText)
  .then(function(result){
    console.log('deleted', idObjectDelete);
    response.sendStatus(200);
  })
  .catch(function(error){
    console.log('error on delete', error);
    response.sendStatus(500);
  })
})//end delete joke router

router.put('/vote', function(request, response){
  const vote = request.body.vote;
  const idToChange = request.body.id;
  console.log(vote, idToChange);
  let change;
  if(vote == 'u'){
    change = 1;
  }
  else if (vote == 'd'){
    change = -1;
  }
  const sqlText = 'UPDATE jokes SET funniness=funniness+$1 WHERE id=$2';
  pool.query(sqlText, [change, idToChange])
    .then(function(result){
      console.log(`updated joke id ${idToChange} with a vote of ${change}`);
      response.sendStatus(200);
    })
    .catch(function(error){
      console.log('error in put');
      response.sendStatus(500);
    })
})//end put router

router.post('/sort', function(request, response){
  const sort = request.body.sort;
  let sqlSort;
  console.log(sort, 'insort router');

  switch (sort){
    case 'nameAscending':
      sqlText = 'SELECT * FROM jokes ORDER BY whos_joke asc';
      break;
    case 'nameDescending':
      sqlText = 'SELECT * FROM jokes ORDER BY whos_joke desc';
      break;
    case 'funninessAscending':
      sqlText = 'SELECT * FROM jokes ORDER BY funniness asc';
      break;
    case 'funninessDescending':
      sqlText = 'SELECT * FROM jokes ORDER BY funniness desc';
      break;
    case 'dateAddedAscending':
      sqlText = 'SELECT * FROM jokes ORDER BY date_added asc';
      break;
    case 'dateAddedDescending':
      sqlText = 'SELECT * FROM jokes ORDER BY date_added desc';
      break;
    }//end switch
  pool.query(sqlText)
  .then(function(result){
    console.log('sort post success');
    response.send(result.rows);
  })
  .catch(function(error){
    console.log('error in sort post');
    response.sendStatus(500);
  })
})//end post sort router

router.post('/edit', function(request, response){
  const idToEdit = request.body.id;
  sqlText = `SELECT * FROM jokes WHERE id = ${idToEdit}`;
  pool.query(sqlText)
  .then(function(result){
    console.log('success in edit port');
    response.send(result.rows);
  })
  .catch(function(error){
    console.log('error in edit port');
    response.sendStatus(500);
  })
})//end post edit router

router.put('/editSubmit', function(request, response){
  const editedJoke = request.body;
  const sqlText = `UPDATE jokes
                   SET whos_joke = '${editedJoke.whos_joke}', joke_question = '${editedJoke.joke_question}',
                   punch_line = '${editedJoke.punch_line}', funniness = ${editedJoke.funniness}
                   WHERE id = ${editedJoke.id}`;
  pool.query(sqlText)
  .then(function(result){
    console.log('success in editput');
    response.sendStatus(200);
  })
  .catch(function(error){
    console.log('error in editput');
  })
})//end put edit

module.exports = router;
