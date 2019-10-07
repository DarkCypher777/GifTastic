$(document).ready(function () {
    var gifs = ["cat", "dog", "bird,", "spooky", "skeletons"];

    function renderButtons() {
        $("buttons-view").empty();
        for (i = 0; i < gifs.length; i++) {
            var button = $("<button type=" + "button" + ">" + gifs[i] + "</button>").addClass("btn btn-primary").attr("data", gifs[i]);
            $("#buttons-view").append(button);
        };
    }
    $("#add-gif").click(function (event) {
        event.preventDefault();
        $("#buttons-view").empty();
        var userInput = $("#gif-input").val().trim();
        gifs.push(userInput);
        renderButtons();
    })
    // Calling the renderButtons function to display the intial buttons
    renderButtons();

    $(document).on("click", ".gif", function (event) {
        event.preventDefault();
        var onOff = $(this).attr("data-state");
        if (onOff === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    })

    $(document).on("click", "button", function () {
        var gif = $(this).attr("data");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gif +
            "&api_key=rU7iplINiN92By9DFqvb7E0px6rmGBgT&limit=10";

        // Performing an AJAX GET request to our queryURL (makes a call)
        $.ajax({
                url: queryURL,
                method: "GET"
            })
            .then(function (response) {
                console.log(queryURL);
                console.log(response);

                var results = response.data;
                for (var i = 0; i < results.length; i++) {

                    var gifDiv = $("<div>");
                    var p = $("<p>").text("Rating: " + results[i].rating);
                    var gifImage = $("<img>");
                    gifImage.attr("src", results[i].images.fixed_height_still.url);
                    gifImage.attr("still-image", results[i].images.fixed_height_still.url);
                    gifImage.attr("data-animate", results[i].images.fixed_height.url);
                    gifImage.attr("data-state", "still");
                    gifImage.addClass("gif");
                    gifDiv.append(p);
                    gifDiv.append(gifImage);
                    $("#gif-display").prepend(gifDiv);
                }
            })
    })
})