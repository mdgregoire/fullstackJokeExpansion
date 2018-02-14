
$(document).ready(function(){
  onReady();
})

function onReady(){
  $('#addJokeButton').on('click', function(){
    getNewJoke();
  });//end addJokeButton
  getJokes();
  $('#outputDiv').on('click', '.jokeOutput', function(){
    let indexToDelete = $(this).index('.jokeOutput');
    deleteJoke(indexToDelete);
  });
}//end onReady function

function deleteJoke(index){
  $.ajax({
    type: 'POST',
    url: '/joke/delete',
    data: {data : index}
  })
  .done(function(response){
    console.log('deletewassuccess', response);
    getJokes();
  })
  .fail(function(error){
    console.log(error);
  });
}//end deleteJoke

function getJokes() {
  $.ajax({
    type: 'GET',
    url: '/joke'
  })
  .done(function(response){
    console.log('getwassuccesssful', response);
    jokeArray = response;
    writeJokes(response);
  })
  .fail(function(error){
    console.log(error);
  })
}//end getJokes

function getNewJoke(){
  console.log('ingetnewjoke');
  $.ajax({
    type: 'POST',
    url: '/joke/add',
    data: {
        whos_joke: $('#whoseJokeIn').val(),
        joke_question: $('#questionIn').val(),
        punch_line: $('#punchlineIn').val(),
        date_added: $('#date_addedIn').val(),
        funniness:  parseInt($('#funniness').val())
          }
  }).done(function(response){
    console.log('getNewJokePost Success', response);
    getJokes();
  }).fail(function(response){
    console.log('getNewJokePost fail', response);
  });

}//end getNewJoke post function

function writeJokes(array){
  $('#whoseJokeIn').val('');
  $('#questionIn').val('');
  $('#punchlineIn').val('');
  $('#date_addedIn').val('');
  $('#funniness').val('');
  $('#outputDiv').empty();
  console.log('inwritejokes');
  for(i=0;i<array.length;i++){
    let stringToAppend = '<li class = "jokeOutput">';
    stringToAppend += array[i].whos_joke+': '+array[i].joke_question+' '+array[i].punch_line+' <b>Date Added:</b> '+array[i].date_added.substring(0,10)+' <b>Funniness:</b> '+array[i].funniness+'</li>';
    $('#outputDiv').append(stringToAppend);
  }
}//end writeJokes
