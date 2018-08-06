var apiKey = "GRjGH3yUlzmuAMXfS7vOP7HuluwPA9vc";
var topics = [];

function renderTopics() {
    $("#buttons").empty();
    topics.forEach(function(topic) {
        var newBtn = $("<button>")
            .attr("class", "search-button")
            .text(topic);
            
        $("#buttons").prepend(newBtn);
    });
}

function renderGif(gif) {
    var gifImg = $("<img>")
        .attr("class", "gif-image")
        .attr("data-still", gif.images.fixed_width_still.url)
        .attr("data-animate", gif.images.fixed_width.url)
        .attr("data-state", "still")
        .attr("src", gif.images.fixed_width_still.url);

                        
    $("#gif-viewer").append(gifImg);
}

$(document).ready(function() {
    renderTopics();
});

$("#submit").click(function() {
    var gifSearch = $("#search-field").val().replace('"', '');
    var validInput = /\w/.test(gifSearch);
    
    if (validInput) {
        topics.push(gifSearch);
        renderTopics();
    }
});

$(document).on("click", ".search-button", function() {
    var searchTerm = $(this).text();
    var url = "https://api.giphy.com/v1/gifs/search?";

    url += $.param({
        api_key: apiKey,
        q: searchTerm,
        limit: 10
    });

    $.ajax({
        url: url,
        method: "GET"
    }).then(function(response) {
        response.data.forEach(function(gif) {
            renderGif(gif);
        });
    });
});

