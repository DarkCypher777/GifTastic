
    var gifs = ["cat", "dog", "bird,", "spooky", "skeletons"];

    // $("button").on("click", function () {

    function displayGifInfo() {
        // look at data structure for values
        var gif = $(this).attr("data-gif");

        // api key variable
        // var apiKey = "&api_key=rU7iplINiN92By9DFqvb7E0px6rmGBgT";

        // storing our giphy api url
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gif +
            "&api_key=rU7iplINiN92By9DFqvb7E0px6rmGBgT&limit=10";

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
    }

    // Function for displaying gifs data
    function renderButtons() {

        // Deleting the gifs prior to adding new gif
        // (this is necessary otherwise you will have repeat buttons)
        $("#buttons-view").empty();

        // Looping through the array of gifs
        for (var i = 0; i < gifs.length; i++) {

            // Then dynamicaly generating buttons for each gif in the array
            // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
            var a = $("<button>");
            // Adding a class of gif-btn to our button
            a.addClass("gif-btn");
            // Adding a data-attribute
            a.attr("data-gif", gifs[i]);
            // Providing the initial button text
            a.text(gifs[i]);
            // Adding the button to the buttons-view div
            $("#buttons-view").append(a);
        }
    }
    
    // This function handles events where a gif button is clicked
    $("#add-gif").on("click", function (event) {
        event.preventDefault();

        // This line grabs the input from the textbox
        var gif = $("#gif-input").val().trim();

        // Adding gif from the textbox to our array
        gifs.push(gif);

        // Calling renderButtons which handles the processing of our gif array
        renderButtons();
    });

    // Adding a click event listener to all elements with a class of "gif-btn"
    $(document).on("click", ".gif-btn", displayGifInfo);

    // Calling the renderButtons function to display the intial buttons
    renderButtons();