// this is the javascript file for the GIFY homework project
$(document).ready(function() {

var searchSubject = "chipmonk";
var gifyAnimals = ["dogs", "cats", "chinchilla", "salamander", "frank zappa", "giraffe"];

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

// displays the GIFYs and, contains the links to the animated GIFYs 
function queryAndDisp(newUrl){
  	$.ajax({
      url: newUrl, 
      method: "GET"
    }).done(function(response) {
  		  var whaDweGitBack = response;
        // Display the first tem GIFYs
        for(var i=0; i<10; i++){
          $(".pictures").prepend("<img src='" + whaDweGitBack.data[i].images.original_still.url + "'data-still='" + whaDweGitBack.data[i].images.original_still.url + "'data-animate='" + whaDweGitBack.data[i].images.original.url + "'data-state='still' class='gif'>")
        }
    });
}

// upon initial start write the default buttons to the screen
renderAllButtons();

// Wait for a new animal, get it then call renderAllButtons
$("#addSubject").on("click", function(event) {
    event.preventDefault();
    var newAnimal = $("#gifySubject").val().trim();
    // add to array
    gifyAnimals.push(newAnimal);
    // clear the field on the screen
    var newAnimal = $("#gifySubject").val("");
    // add to screen
    renderAllButtons();
});

// Wait for a GIFY subject to display 
$(".buttonBloc").on("click", "button", function() {
    searchSubject = $(this).text();
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + searchSubject + "&api_key=dc6zaTOxFJmzC";
    queryAndDisp(queryURL);
    });

// wait for a GIFY to be clicked
$(".pictures").on("click", ".gif", function() {
      // store the image's data-state
      var state = $(this).data("state");
      // chage the state and src to the opposite
      switch (state) {
        case "animate":
            $(this).data("state", "still");
            $(this).attr("src", $(this).data("still"));
        break;
        case "still":
            $(this).data("state", "animate");
            $(this).attr("src", $(this).data("animate"));
        break;
      }
});

// end doc ready
})