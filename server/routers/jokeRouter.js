const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
const bodyParser = require('body-parser');



console.log('in router');

router.get('/', function(request, response){
  console.log('injoke get');
  const sqlText = 'SELECT * FROM jokes';
  pool.query(sqlText)
  .then(function(result){
    console.log('got result', result);
    response.send(result);
  })
  .catch(function(error){
    console.log('error on GET', error);
    response.sendStatus(500);
  })
})//end get joke router




module.exports = router;
