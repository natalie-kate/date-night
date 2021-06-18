// Declaring variables.
const goOut = ["Bowling Alley", "Restaurant", "Nightclub", "Cinema", "Bar", "Escape Room", "Live Music", "Pool Hall"];
let decisionResult;
let map;
let infoWindow;
let service;
let currentPosition;
let optionNumber = 1;
let timerInterval;

// Timer function.
function timer(timeLeft) {
    // Set interval, colour change on timer and restart message upon time-left reaching 0.
    timerInterval = setInterval(function () {
        if (timeLeft < 0) {
            $("#options").html(`<div class="text-center"><h2>You ran out of time!</h2>
            <a id="restart" class="btn btn-lg hover-btn" href="decision.html">Start Again?</a></div>`);
            return;
        } else {
            $("#timer p").text(timeLeft);

            if (timeLeft == 5) {
                $("#timer p").css("color", "orange");
            }
            if (timeLeft == 3) {
                $("#timer p").css("color", "red");
            }
            if (timeLeft == 0) {
                $("#timer p").css("animation", "flash 500ms 2");
            }
        }
        // -=1 I seen on slack, it was the reminder I needed.
        timeLeft -= 1;
    }, 1000);
}

// Event listener to start timer.
$('#start').on('click', timer(7));

// Timer stop function to reset timer.
function timerStop() {
    clearInterval(timerInterval);
    $("#timer p").css("color", "green");
    $("#timer p").text("8");
}

// Event listener for staying in button being selected.
// Timer is stopped
$("#option1").click(function () {
    timerStop();
    let stayingInOptions = ["Movie Night", "TV Binge", "Takeaway", "Game Night", "Cook Together", "Video Games", "Cocktail Making", "Pamper Session"];
    startChosenGame(stayingInOptions);
});

// Event listener for going out button being selected.
// Timer is stopped
$("#option2").click(function () {
    timerStop();
    let goOutOptions = ["Bowling Alley", "Restaurant", "Nightclub", "Cinema", "Bar", "Escape Room", "Live Music", "Pool Hall"];
    startChosenGame(goOutOptions);
});

// First two button are cleared and next two are shown.
// Decision number counter is shown and number is incremented.
function startChosenGame(array) {
    $("#option1, #option2").hide();
    $("#option3, #option4").show();
    $("#number").text(optionNumber);
    optionNumber += 1;
    game(array);
}

// Game functions
function game(options) {
    let chosenOptions = [];
    // Not chosen array was proposed by Jo in tutor support.
    let notChosen = [];
    randomChoice(options);

    // Two random numbers are picked 1 with array length, one with array length minus 1.
    function randomChoice(optionsArray) {
        let arrayLength = optionsArray.length;
        let adjustedLength = arrayLength -= 1;
        let randomNumber1 = Math.floor(Math.random() * length);
        let randomNumber2 = Math.floor(Math.random() * adjustedLength);
        getOptions(randomNumber1, randomNumber2);
        // The random numbers then used to pick and splice options from the array.
        function getOptions(num1, num2) {
            let button1 = options[num1];
            options.splice([num1], 1);
            let button2 = options[num2];
            options.splice([num2], 1);
            displayOptions(button1, button2);
        }
        // The options are then displayed and decision counter amended and incremented.
        function displayOptions(buttonText1, buttonText2) {
            $("#option3").text(buttonText1);
            $("#option4").text(buttonText2);
            $("#number").text(optionNumber);
            optionNumber += 1;
        }
        // Timer restarted.
        timer(7);
    }

    // Event listeners on option buttons, stops timer and pushes displayed options to relevant arrays
    $("#option3").click(function () {
        timerStop();
        chosenOptions.push($("#option3").text());
        notChosen.push($("#option4").text());
        arrayChecking();
    });
    $("#option4").click(function () {
        timerStop();
        chosenOptions.push($("#option4").text());
        notChosen.push($("#option3").text());
        arrayChecking();
    });

    // Checks progress of the game by array length, concating arrays when appropriate
    function arrayChecking() {
        if ((notChosen.length >= 6) && ((options.length + chosenOptions.length) == 2)) {
            let remainingChoices = options.concat(chosenOptions);
            finalChoice(remainingChoices[0], remainingChoices[1]);
        } else if ((options.length == 0) && (chosenOptions.length > 1)) {
            chosenOptions.forEach(function (i) {
                options.push(i);
            });
            // Emptying of array from Anthony on stack overflow.
            chosenOptions.splice(0, chosenOptions.length);
            randomChoice(options);
        } else {
            randomChoice(options);
        }
    }

    // Final decision, buttons hidden and new ones displayed 
    function finalChoice(choice1, choice2) {
        $("#option3, #option4").hide();
        $("#option5").show().text(choice1);
        $("#option6").show().text(choice2);
        $(".decision-number").text("Final Choice");
        timer(7);
        // Event listeners for final choice 
        $("#option5, #option6").click(function () {
            decisionResult = $(this).text();
            showResults(decisionResult);
        });
    }

    // Results displayed by getting class name from winning option
    function showResults(winningOption) {
        $(".game").hide();
        // Getting first word from string- ComFreek StackOverlow.
        let findClass = winningOption.toLowerCase().split(" ");
        let resultClass = "." + findClass[0];
        $(resultClass).show();
        // If winning option is going out then create script for map - Josh Johnson Stack Overflow.
        if (goOut.includes(winningOption)) {
            let mapScript = document.createElement("script");
            mapScript.setAttribute("src", "https://maps.googleapis.com/maps/api/js?key=AIzaSyBEXEhAnQ8U5GQFcn8zacPVJ9FFhiPMNMs&callback=initMap&libraries=places&v=weekly");
            document.body.appendChild(mapScript);
            $(".going-out").show();
        }
    }
}

// Map functions for those results that are for going out.
// These functions were built using the required parts of different examples within the Google Maps API documentation.

// Initial map
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 5,
        center: {
            lat: 55.8954,
            lng: -4.2518
        },
        mapTypeControl: true,
        mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
            mapTypeIds: ["roadmap", "terrain"],
        }
    });
    const input = document.getElementById("enter-location");
    const searchBox = new google.maps.places.SearchBox(input);

    // Event listener for search box, gets latlng for request
    searchBox.addListener("places_changed", () => {
        const places = searchBox.getPlaces();
        // lat lng methods - Avinav Stack Overflow
        let searchLat = places[0].geometry.location.lat();
        let searchLng = places[0].geometry.location.lng();
        let searchPosition = new google.maps.LatLng(searchLat, searchLng);

        // Request to get winning option places in area input by user
        var request = {
            location: searchPosition,
            radius: '1500',
            query: decisionResult
        };

        service = new google.maps.places.PlacesService(map);
        service.textSearch(request, callback);
    });
}

// Event listener for users location button, gets latlng for request
$("#locationButton").click(function () {
    navigator.geolocation.getCurrentPosition(yes, no);

    function yes(position) {
        let userLat = position.coords.latitude;
        let userLong = position.coords.longitude;
        currentPosition = new google.maps.LatLng(userLat, userLong);
        // Request to get winning option places users area.
        var request = {
            location: currentPosition,
            radius: '1500',
            query: decisionResult
        };
        service = new google.maps.places.PlacesService(map);
        service.textSearch(request, callback);
    }
    // In the event that geolocation isn't supported show alert.
    function no() {
        $("#sorry").show();
    }
});

// For each place in resulting array call createMarker function.
// Centre of map reset to first location in resulting places.
function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (let i = 0; i < results.length; i++) {
            createMarker(results[i]);
        }
        map.setCenter(results[0].geometry.location);
        map.setZoom(12);
    }
}

// If place doesn't have geometry or location, function ends.
// If place does have these then create a marker. 
function createMarker(place) {
    if (!place.geometry || !place.geometry.location) {
        return;
    } else {
        let marker = new google.maps.Marker({
            map,
            position: place.geometry.location,
            title: place.name,
            optimized: false
        });
        // Get info for info window
        let address = place.formatted_address;
        let name = place.name;
        let textInfo =
            `<div class=info-box><h3>${name}</h3>
        <p>${address}</p></div>`;

        infoWindow = new google.maps.InfoWindow();

        // Event listener for markers, opens info window and sets the content
        marker.addListener("click", function () {
            infoWindow.close();
            infoWindow.open(map, this);
            infoWindow.setContent(textInfo);
        });
    }
}