//variables used
var topics = ["skunk", "dog", "red dead redemption 2", "bison", "bird", "everclear" ];
var queryURL = "";
var animal = "";
var singleTopic = "";


//fiunction to pause and play GIFS
function pauseAndStart() {
$("img").on("click", function() {
  console.log("test"); 
  var state = $(this).attr("data-state");
  if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else if (state === "animate") {
      $(this).attr("src", $(this).attr("data-still"))
      $(this).attr("data-state", "still");
    }});
  }

   //function to create button 
  function renderButtons() {
    $("#topics-view").empty();
    for (var i = 0; i < topics.length; i++) {
        var a = $("<button>");
        a.attr("data-name", topics[i]);
        a.text(topics[i]);
        $("#topics-view").append(a);
    };

    //onclick function to poulate gifs when user adds topic, part of renderButtons function
    $("button").on("click", function() {
      var animal = $(this).attr("data-name");
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        animal + "&api_key=1Ap9PRfNxbH1S8pDXRJkIkh2mwOKmiPR&limit=10";
        event.preventDefault();
        
      $.ajax({
        url: queryURL,
        method: "GET"
      })
        .then(function(response) {
          var results = response.data;
  
          for (var i = 0; i < results.length; i++) {
            var gifDiv = $("<div1>");
  
            var rating = results[i].rating;
            
            var p = $("<p>").text("Rating: " + rating);
  
            var animal = $("<img>");

            animal.attr("src", results[i].images.original_still.url);
            animal.attr("data-still", results[i].images.original_still.url)
            animal.attr("data-animate", results[i].images.original.url)
            animal.attr("data-state", "still");
            animal.addClass("img-responsive center-block gif")
  
            gifDiv.prepend(p);
            gifDiv.prepend(animal);
          
  
            $("#gif-pic").prepend(gifDiv);
            $("#rating").html(response);
          }

          pauseAndStart();
              
      })
    }) 
  }  
  
  //renderButtons();
  //populateGIF();
  
    
  
//function to dump gifs from preselected buttos on page

function populateGIF() {
$("#add-topic").on("click", function(event){
    event.preventDefault();
    var singleTopic = $("#topic-typed").val();
    topics.push(singleTopic);
    renderButtons();
 

   var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        singleTopic + "&api_key=1Ap9PRfNxbH1S8pDXRJkIkh2mwOKmiPR&limit=10";
    
    $.ajax({
      url: queryURL,
      method: "GET"
    })
  
    .then(function(response) {
    var results = response.data;


    for (var i = 0; i < results.length; i++) {
      var gifDiv = $("<div1>");

      var rating = results[i].rating;
      

      var p = $("<p>").text("Rating: " + rating);

      var animalImage = $("<img>");
      
      animalImage.attr("src", results[i].images.original_still.url);
      animalImage.attr("data-still", results[i].images.original_still.url)
      animalImage.attr("data-animate", results[i].images.original.url)
      animalImage.attr("data-state", "still");
      animalImage.addClass("img-responsive center-block gif")


      gifDiv.prepend(p);
      gifDiv.prepend(animalImage);

      $("#gif-pic").prepend(gifDiv);
      $("#rating").html(response);
    }

    pauseAndStart();
  
})
})
}

//frunctions to run everything
  renderButtons();
  populateGIF();