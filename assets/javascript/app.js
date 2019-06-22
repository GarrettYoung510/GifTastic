$(document).ready(function() {
    // after html loads run this function
    populateButtons(searchArray, 'searchButton', '#buttonsArea');
    // populate buttons function using search array, the search button class to add, and buttons area is where to add to
    // console.log("LINKED!!");
    // to make sure file linked correctly
});

var searchArray = ['food', 'dog', 'dwayne', ];
// hold search array

function populateButtons(searchArray, classToAdd, areaToAddTo) {
    // defining function for populating buttons, draw from search array, what class to add and what area to add it to
    $(areaToAddTo).empty();
    // first empty out area to add to
    for (var i = 0; i < searchArray.length; i++) {
        // loops through searchArray
        var a = $('<button class="btn btn-info m-2">');
        // creates a variable a button
        a.addClass(classToAdd);
        // adds the class to add that is defined above
        a.attr('data-type', searchArray[i]);
        // data type set to search array i whatever is in that index 
        a.text(searchArray[i]);
        // text of the button is set to whatever is in that index 
        $(areaToAddTo).append(a);
        // append that BUTTON!
    }
}

$(document).on('click', '.searchButton', function() {
    // triggers function on click even when clicking search
    $('#searches').empty();
    // empties out the search after it is searched

    let type = $(this).data('type');
    // type variable is what is added to the query URL

    var apikey = '4ls8TZiUFRiUhJxPs3l3ZyZu4Vi3d5nH';
    // just in case user wants to input their own api key

    var queryURL = `https://api.giphy.com/v1/gifs/search?q=${type}&api_key=${apikey}&limit=10`;
    // api url with key from giphy.com

    $.ajax({
        // set up ajax request
        url: queryURL,
        // url to query
        method: 'GET'
            // method is get
    }).then(function(response) {
        // .then promise after query works
        for (var i = 0; i < response.data.length; i++) {
            // for loop to go through the responses
            var searchDiv = $('<div class="search-item ml-2">');
            // create a div for each search item
            var rating = response.data[i].rating;
            // for the rating
            var p = $('<p>').text('Rating: ' + rating);
            // add to the page
            var animated = response.data[i].images.fixed_height.url;
            // animated 
            var still = response.data[i].images.fixed_height_still.url;
            // still
            var image = $('<img class="ml-2">');
            // create img var
            image.attr('src', still);
            // set attribute for src 
            image.attr('data-still', still);
            // set attribute for data-still
            image.attr('data-animated', animated);
            // set attribute for data-animated
            image.attr('data-state', 'still');
            // set attribute for data state
            image.addClass('searchImage');
            // add class search image
            searchDiv.append(p);
            // append to the page the p var
            searchDiv.append(image);
            // append to the page the image var
            $('#searches').append(searchDiv);
            // append searches to searchdiv
        }
    })
})


$(document).on('click', '.searchImage', function() {
    // on click for image that popped up function
    var state = $(this).attr('data-state');
    // variable to hold state
    if (state == 'still') {
        // if state is still this is what happens
        $(this).attr('src', $(this).data('animated'));
        $(this).attr('data-state', 'animated');
    } else {
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
    }
})

$('#submit').on('click', function() {
    const newSearch = $('#search-input').val().trim().toLowerCase();
    // input type text and input type submit, it would go for submit if we did not put eq
    searchArray.push(newSearch);
    // add to the searcharray
    populateButtons(searchArray, 'searchButton', '#buttonsArea');
    // populate buttons function again

    return false;

})