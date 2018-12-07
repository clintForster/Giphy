
var topics = ["Weird", "Interesting", "Cool", "Funny", "Awesome", "Waffles"];


function rebuildButtons() {
    for (var i = 0; i < topics.length; i++) {
        var newBtn = $("<button>").text(topics[i]);
        $("#buttonsDiv").append(newBtn);
        newBtn.addClass("button");
        newBtn.attr("value", topics[i]);
    }
}

function checkArray(newSearchButton) {
    for (var i = 0; i < topics.length + 1; i++) {
        if (newSearchButton === topics[i]) {
            return true;
        }
    }
    return false;
}

function whenPressed(queryURL) {

    $.ajax({
        url: queryURL,
        method: 'GET'
    }).then(function (response) {
        console.log(response);
        for (var i = 0; i < response.data.length; i++) {
        var imgDiv = $("<div>");
        var img = $("<img>");
        $(img).attr("src", response.data[i].images.original_still.url);
        $(img).attr("width", "700px");
        $(img).attr("text-align", "center");
        $(img).attr("data-state", "still");
        $(img).attr("data-still", response.data[i].images.original_still.url);
        $(img).attr("data-animate", response.data[i].images.original.url);
        $(img).addClass("gif");

        $(imgDiv).attr("id", "text");
        $(imgDiv).text("Rating: "+ response.data[i].rating);
        $(imgDiv).prepend(img);
        $("#row1").prepend(imgDiv);
        }
        $(".gif").on("click", function() {
            
            var state = $(this).attr("data-state");
            
            if (state === "still") {
              $(this).attr("src", $(this).attr("data-animate"));
              $(this).attr("data-state", "animate");
            } else {
              $(this).attr("src", $(this).attr("data-still"));
              $(this).attr("data-state", "still");
            }
          });
    });
}
// Is recalling the same method everytime to create the buttons considered bad practice?
rebuildButtons();

$(document).on("click", ".button", function () {
    event.preventDefault();
    var newSearchButton = $("#search").val();
    console.log(this);

    if (this.value !== "submit") {
        newSearchButton = this.value
    }

    console.log(newSearchButton);
    if (checkArray(newSearchButton) === true || newSearchButton === "") {
        // Is this considered bad practice as well?
        $("#buttonsDiv").empty();
        rebuildButtons();

    } else if (checkArray(newSearchButton) === false) {
        topics.push(newSearchButton);
        $("#buttonsDiv").empty();
        rebuildButtons();
    }
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + newSearchButton + "&api_key=oMhVIYpS6S2rsB7Xp9J6ZdqwQnO578fq&limit=10";
    whenPressed(queryURL);

});
