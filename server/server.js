const express = require('express');
const app = express();
const PORT = 5000;
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('server/public'));

const jokeRouter = require('./routers/jokeRouter');
app.use('/joke', jokeRouter);



app.listen(PORT, function(){
  console.log(`server listening on port ${PORT}`);
});//end app listen
