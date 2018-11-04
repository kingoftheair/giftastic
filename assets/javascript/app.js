var topics = ["eagle", "dog", "cat", "dolphin", "skunk" ];

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

//ajax call
/*
$("#add-topic").on("click", function(event) {
    event.preventDefault();

     

    var apiKey = "1Ap9PRfNxbH1S8pDXRJkIkh2mwOKmiPR";

    var queryURL = "https:api.giphy.com/v1/gifs/search?1Ap9PRfNxbH1S8pDXRJkIkh2mwOKmiPR" + singleTopic + "&limit=25&offset=0&rating=G&lang=en" + apiKey;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        console.log(queryURL);
        console.log(response);
        $("#rating").text(JSON.stringify(response));
    })
})
*/

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

    ///
    /*
      .then(function(response) {

      //
        var queryURL = response.data.image_original_url;

        //
        var animalImage = $("<img>");

        //
        animalImage.attr("src", queryURL);
        animalImage.attr("alt", "cat image");

        //
        $("#gif-pic").prepend(animalImage);
        $("#rating").html(response);
        console.log(queryURL);
        console.log(response);
      }); */ 
  
  .then(function(response) {
    var results = response.data;

    for (var i = 0; i < results.length; i++) {
      var gifDiv = $("<div>");

      var rating = results[i].rating;
      //var queryURL = response.data.image_original_url;


      var p = $("<p>").text("Rating: " + rating);

      var singleTopic = $("<img>");
      singleTopic.attr("src", results[i].images.fixed_height.url);

      gifDiv.prepend(p);
      gifDiv.prepend(singleTopic);



      $("#gif-pic").prepend(gifDiv);
      $("#rating").html(response);
    }
  });
  
});

