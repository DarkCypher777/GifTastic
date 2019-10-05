$(document).ready(function () {

    // gifs have to be still when appear (data-state still)
    // gifs clicked on animate (data-state animate)
    // type: gif, 
    // images.   fixed.height.small.still (for still images) (<style> inline-style = width:  to change size)
    // check class vid around 11:10 AM to 11:15 AM or time maker 1:10

    $("button").on("click", function () {

        // look at data structure for values
        var gif = $(this).attr("data-gif");

        // api key variable
        // var apiKey = "&api_key=rU7iplINiN92By9DFqvb7E0px6rmGBgT";

        // storing our giphy api url
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + gif +
            "&api_key=rU7iplINiN92By9DFqvb7E0px6rmGBgT&limit=5";


        // function displayGif() {

        // Performing an AJAX GET request to our queryURL (makes a call)
        $.ajax({
                url: queryURL,
                method: "GET"
            })

            //after the data from the AJAX request comes back (gets a callback)
            .then(function (response) {
                console.log(queryURL);
                console.log(response);

                // storing the data from the AJAX request in the results variable
                var results = response.data;

                // Looping through each result item
                for (var i = 0; i < results.length; i++) {

                    // Creating and storing a div tag
                    var gifDiv = $("<div>");

                    // Creating a paragraph tag with the result item's rating
                    var p = $("<p>").text("Rating: " + results[i].rating);

                    // Creating and storing an image tag
                    var gifImage = $("<img>");

                    // Setting the src attribute of the image to a property pulled off the result item
                    gifImage.attr("src", results[i].images.fixed_height.url);

                    // Appending the paragraph and image tag to the animalDiv
                    gifDiv.append(p);
                    gifDiv.append(gifImage);

                    // Prependng the animalDiv to the HTML page in the "#gifs-display" div
                    $("#gif-display").prepend(gifDiv);
                }
            });
        // }
    });
});