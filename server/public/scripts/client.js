
$(document).ready(function(){
  onReady();
})

function onReady(){
  $('#editField').hide();
  getJokes();
  $('#addJokeButton').on('click', function(){
    getNewJoke();
  });//end addJokeButton

  $('#outputDiv').on('click', '.deleteButton', function(){
    var id = $(this).attr('id');
    console.log(id, 'indeleteclick');
    deleteJoke(id);
  });//end onclick delete button

  $('#outputDiv').on('click', '.upvote', function() {
    runVote($(this).val(), $(this).attr('id'));
  })//end onclick upvote

  $('#outputDiv').on('click', '.downvote', function() {
    runVote($(this).val(), $(this).attr('id'));
  })//end onclick upvote

  $('#sort').on('click', function(){
    let howSort = $('#sortSelector').val();
    sortOutputs(howSort);
  })//end sort Button onclick

  $('#outputDiv').on('click', '.edit', function(){
    editJoke($(this).attr('id'));
  })//end edit button onclick

  $('#editField').on('click','.editJokeSubmit', function(){
      submitEditedJoke($(this).attr('id'))

  })

}//end onReady function

function deleteJoke(id){
  console.log(id, 'indeetejoke');
  $.ajax({
    type: 'DELETE',
    url: '/joke/delete',
    data: {data : id}
  })
  .done(function(response){
    console.log('deletewassuccess', response);
    getJokes();
  })
  .fail(function(error){
    console.log(error);
  });
}//end deleteJoke

function editJoke(id){
  console.log(id, 'ineditjoke');
  $('#editField').show();
  getEditJoke(id);
}//end editJoke

function getJokes() {
  $.ajax({
    type: 'GET',
    url: '/joke'
  })
  .done(function(response){
    console.log('getwassuccesssful', response);
    writeJokes(response);
  })
  .fail(function(error){
    console.log(error);
  })
}//end getJokes

function getEditJoke(id){
  $.ajax({
    type: 'POST',
    url: '/joke/edit',
    data: { id: id}
  }).done(function(response){
    console.log('getEditJoke Success', response);
    $('#whosJokeEdit').val(response[0].whos_joke);
    $('#questionEdit').val(response[0].joke_question);
    $('#punchlineEdit').val(response[0].punch_line);
    $('#funninessEdit').val(response[0].funniness);
    $('#editField').append(`<button class ="editJokeSubmit" id= ${response[0].id}>Submit Edited Joke</button>`)
  }).fail(function(response){
    console.log('getEditJoke fail', response);
  });
}//end getEditJoke

function getNewJoke(){
  $.ajax({
    type: 'POST',
    url: '/joke/add',
    data: {
        whos_joke: $('#whosJokeIn').val(),
        joke_question: $('#questionIn').val(),
        punch_line: $('#punchlineIn').val(),
        funniness:  parseInt($('#funniness').val())
          }
  }).done(function(response){
    console.log('getNewJokePost Success', response);
    getJokes();
  }).fail(function(response){
    console.log('getNewJokePost fail', response);
  });

}//end getNewJoke post function

function runVote(vote, id){
  console.log("in runvote");
  console.log(vote, id, 'inrunvote');
  $.ajax({
    type: 'PUT',
    url: '/joke/vote',
    data: {
        vote: vote,
        id: id
    }
  })
  .done(function(response){
    console.log('updated funniness');
    getJokes();
  })
  .fail(function(error){
    alert("Funniness Value can only be between 1 and 10!");
    console.log(('funniness update fail'));
  })//end ajax put
}//end runVote function

function sortOutputs(howSort){
  console.log(howSort, 'insort');
  $.ajax({
    type: 'POST',
    url: '/joke/sort',
    data: {sort: howSort}

  }).done(function(response){
    console.log('sortOutputsPost Success', response);
    writeJokes(response);
  }).fail(function(response){
    console.log('sortOutputsPost fail', response);
  });

}//end sortOutputs

function submitEditedJoke(id){
  console.log('insubmiteditedjoke', id);
  $.ajax({
    type: 'PUT',
    url: '/joke/editSubmit',
    data: {
        id: id,
        whos_joke: $('#whosJokeEdit').val(),
        joke_question: $('#questionEdit').val(),
        punch_line: $('#punchlineEdit').val(),
        funniness:  parseInt($('#funninessEdit').val())
          }
  }).done(function(response){
    console.log('submitEditedJoke Success', response);
  ////----  //a call to re-write the db of jokes goes here
    getJokes();
  }).fail(function(response){
    console.log('submitEditedJoke fail', response);
  });
}

function writeJokes(array){
  $('#whoseJokeIn').val('');
  $('#questionIn').val('');
  $('#punchlineIn').val('');
  $('#funniness').val('');
  $('#tbody').empty();
  console.log('inwritejokes');
  for(i=0;i<array.length;i++){
    let id = array[i].id;
    let stringToAppend = `<tr = "jokeOutput"><td>`;
    stringToAppend += array[i].whos_joke+'</td><td>'+array[i].joke_question+'</td><td>'+array[i].punch_line;
    stringToAppend += '</td><td>'+array[i].date_added.substring(0,10)+'</td><td>'+array[i].funniness;
    stringToAppend += '</td><td>'+`<button class = "deleteButton" id = ${id}>Delete Joke</button></td><td>`;
    stringToAppend += `<button class = "upvote" id = ${id} value = "u">Upvote</button></td><td>`;
    stringToAppend += `<button class = "downvote" id = ${id} value = "d">Downvote</button></td><td>`;
    stringToAppend += `<button class = "edit" id = ${id}>Edit Joke</button></td></tr>`;
    $('.jokeTable').append(stringToAppend);
  }
}//end writeJokes
