var topics = ["skunk", "dog", "cat", "bison", "bird", "pig" ];

//Add buttons for original animal topic array

function renderButtons() {
    $("#topics-view").empty();
    for (var i = 0; i < topics.length; i++) {
        var a = $("<button>");
        a.addClass("topics");
        a.attr("data-name", topics[i]);
        a.text(topics[i]);
        $("#topics-view").append(a);
    } 
} 


$("#add-topic").on("click", function(event){
    event.preventDefault();
    var singleTopic = $("#topic-typed").val().trim();
    topics.push(singleTopic);
    renderButtons();
}); 


renderButtons();

//this allows user to type topic and then populate gifs
$("#add-topic").on("click", function() {
    event.preventDefault();
    //
   var singleTopic = $("#topic-typed").val()
  // singleTopic = $("#topic-typed").val();
  //var apiKey = "1Ap9PRfNxbH1S8pDXRJkIkh2mwOKmiPR";

   var animalImage = $(this).attr("topic-typed");
   var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        singleTopic + "&api_key=1Ap9PRfNxbH1S8pDXRJkIkh2mwOKmiPR&limit=10";
    //
    $.ajax({
      url: queryURL,
      method: "GET"
    })
  
  .then(function(response) {
    var results = response.data;

    for (var i = 0; i < results.length; i++) {
      var gifDiv = $("<div>");

      var rating = results[i].rating;
      //var queryURL = response.data.image_original_url;


      var p = $("<p>").text("Rating: " + rating);

      var animalImage = $("<img>");
      animalImage.attr("src", results[i].images.fixed_height.url);

      gifDiv.prepend(p);
      gifDiv.prepend(animalImage);



      $("#gif-pic").prepend(gifDiv);
      $("#rating").html(response);
    }
  });
  
});

// now for button pause
/*
$(".gif-pic").on("click", function() {

    var state = $(this).attr("topic-typed");

    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"))
      $(this).attr("topic-typed", "animate")
    } else {
      $(this).attr("src", $(this).attr("data-still"))
      $(this).attr("topic-typed", "still")
    }

  });
*/
  //done with pause


  //this adds gif pics for preselected topics at beggining og page
$("button").on("click", function() {
    var animal = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      animal + "&api_key=1Ap9PRfNxbH1S8pDXRJkIkh2mwOKmiPR&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    })
      .then(function(response) {
        var results = response.data;

        for (var i = 0; i < results.length; i++) {
          var gifDiv = $("<div>");

          var rating = results[i].rating;

          var p = $("<p>").text("Rating: " + rating);

          var animal = $("<img>");
          animal.attr("src", results[i].images.fixed_height.url);

          gifDiv.prepend(p);
          gifDiv.prepend(animal);

          $("#gif-pic").prepend(gifDiv);
        }
      });
  });
