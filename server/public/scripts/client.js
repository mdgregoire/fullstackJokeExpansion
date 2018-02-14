console.log('js');

$(document).ready(function(){
  console.log('jq');
  writeJokes();
})


function writeJokes() {
  console.log('inwritejokes');
  $.ajax({
    type: 'GET',
    url: '/joke'
  })
  .done(function(response){
    console.log('getwassuccesssful');
    $('#outputDiv').text(response);
  })
  .fail(function(error){
    console.log(error);
  })
}
