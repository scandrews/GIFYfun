// this is the javascript file for the GIFY homework project
$(document).ready(function() {

var searchSubject = "chipmonk";
var gifyAnimals = ["dogs", "cats"];

function renderAllButtons() {
    // delete all buttons
    $(".buttonBloc").empty();
    for(var i=0; i<gifyAnimals.length; i++){
        var button = $("<button>");
        button.addClass("gifyButtons");
        button.text(gifyAnimals[i]);
        $(".buttonBloc").append(button)
    }
}

// write the default buttons to the screen
renderAllButtons();

// Wait for a new animal, get it then call renderAllButtons
$("#addSubject").on("click", function(event) {
    event.preventDefault();
  	var newAnimal = $("#gifySubject").val().trim();
    // add to array
    gifyAnimals.push(newAnimal);
    // add to screen
    renderAllButtons();
});

// Wait for a GIFY subject to display 
$(".buttonBloc").on("click", "button", function() {
    searchSubject = $(this).text();
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + searchSubject + "&api_key=dc6zaTOxFJmzC";
	  queryAndDisp(queryURL);
    });

function queryAndDisp(newUrl){
  	$.ajax({
      url: newUrl, 
      method: "GET"
    }).done(function(response) {
  		  var whaDweGitBack = response;
        for(var i=0; i<10; i++){
          $(".pictures").prepend("<img src='" + whaDweGitBack.data[i].images.downsized.url + "'>");
        }
    });
}




// alert(searchSubject); 
        // console.log("search Subject - " + searchSubject);
        // var searchSubject = $(this).attr("data-name");




// console.log("at end search subject - " + searchSubject);
// console.log("at end query URL - " + queryURL);
// console.log("at end picToDisplay - " + picToDisplay);

// end doc ready
})