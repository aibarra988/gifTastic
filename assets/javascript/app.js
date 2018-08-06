var apiKey = "GRjGH3yUlzmuAMXfS7vOP7HuluwPA9vc";
var topics = [];

/**
 * Retrieves 10 gifs of a given search term
 * @param {string} searchTerm 
 * @returns AJAX Promise
 */
function fetchGifs(searchTerm) {
    var url = "https://api.giphy.com/v1/gifs/search?";
    
    url += $.param({
        api_key: apiKey,
        q: searchTerm,
        limit: 10
    });
    
    return $.ajax({ url: url, method: "GET" });
}

/**
 * Fills the #gif-viewer with API response content
 * @param {Promise} response 
 */
function populateGifViewer(response) {
    response.data.forEach(renderGif);
}

function makeSearchButton() {
    var gifSearch = $("#search-field").val();
    var validInput = /\w/.test(gifSearch);
    
    if (validInput) {
        topics.push(gifSearch);
        renderTopics();
        $("#search-field").val("");
    }
}

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
    var gifDiv = $("<div>");
    
    var gifImg = $("<img>")
        .attr("class", "thumbnail gif-image")
        .attr("data-still", gif.images.fixed_width_still.url)
        .attr("data-animate", gif.images.fixed_width.url)
        .attr("data-state", "still")
        .attr("src", gif.images.fixed_width_still.url);
    
    gifDiv.append(gifImg);

    var gifRating = $("<span>")
        .text("Rated: ", gif.rating.toUpperCase());
    
    gifDiv.append(gifRating);

    var downloadLink = $("<a>")
        .attr("class", "download")
        .text("Download ");
    var fontAwesomeCloud = $("<i>")
        .attr("class", "fas fa-cloud-download-alt");
    downloadLink.append(fontAwesomeCloud);

    gifDiv.append(downloadLink);
    
    $("#gif-viewer").append(gifDiv);
}

/**
 * Handler section
 */


// Render the topics as buttons when the page loads
$(document).ready(function() {
    renderTopics();
});

// When the user presses enter on the search field
$("#search-field").keypress(function(event){
    var keycode = (event.keyCode ? event.keyCode : event.which);
    
    if(keycode == '13'){
        makeSearchButton();  
    }
});

$("#submit").click(function() {
    makeSearchButton();
});

$(document).on("click", ".search-button", function() {
    var searchTerm = $(this).text();
    
    fetchGifs(searchTerm)
        .then(populateGifViewer);
});

$(document).on("click", ".gif-image", function() {
    var state = $(this).attr("data-state");
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));   
        $(this).attr("data-state", "animate");  
    } else {
        $(this).attr("src", $(this).attr("data-still"));   
        $(this).attr("data-state", "still");  
    }
});

$(document).on("click", ".download", function() {
    console.log("Hold on I need to implement downloads!");
});