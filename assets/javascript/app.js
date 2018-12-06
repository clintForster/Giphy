
var topics = ["Weird", "Interesting", "Cool", "Funny", "Awesome", "Waffles"];

function rebuildButtons() {
    for (var i = 0; i < topics.length; i++) {
        var newBtn = $("<button>").text(topics[i]);
        $("#buttonsDiv").append(newBtn);
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

// Is recalling the same method everytime to create the buttons considered bad practice?
rebuildButtons();

$("#submit").on("click", function () {
    var newSearchButton = $("#search").val();


    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + newSearchButton + "&api_key=oMhVIYpS6S2rsB7Xp9J6ZdqwQnO578fq&limit=10";

    $.ajax({
        url: queryURL,
        method: 'GET'
    }).then(function (response) {
        for (var i = 0; i < topics.length; i++) {

            console.log(response)
            // newSearchButton.attr("src", topics[i].)
        }
    });



    if (checkArray(newSearchButton) === true || newSearchButton === "") {
        // Is this considered bad practice as well?
        $("#buttonsDiv").empty();
        rebuildButtons();

    } else if (checkArray(newSearchButton) === false) {
        topics.push(newSearchButton);
        $("#buttonsDiv").empty();
        rebuildButtons();
    }

    event.preventDefault();

});
