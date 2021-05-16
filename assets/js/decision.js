$('#start').on('click', timer());

function timer() {

    let timeLeft = 7;

    setInterval(function () {

        if (timeLeft < 0) {
            return;
        } else {
            $("#timer p").text(timeLeft);
            $("#timer p").css("color", "orange");

            if (timeLeft <= 3) {
                $("#timer p").css("transition-duration", "2000ms");
                $("#timer p").css("color", "red");
            }
            if (timeLeft < 2) {
                $("#timer p").css("animation", "flash 500ms 5");
            }
        }
        timeLeft -= 1;
    }, 1000)
}

$("#option1").click(function() {
    let stayingInOptions = ["Movie Night", "TV Binge", "Takeaway", "Game Night", "Cook Together", "Video Games", "Cocktail Making", "Pamper Session"];
    $(this).hide();
    $("#option2").hide();
    $("#option3").show();
    $("#option4").show();
    game(stayingInOptions);
  });

$("#option2").click(function() {
    let goOutOptions = ["Bowling", "Dinner", "Club", "Cinema", "Bar", "Escape Room", "Live Music", "Pool Hall"];
    $(this).hide();
    $("#option1").hide();
    $("#option3").show();
    $("#option4").show();
    game(goOutOptions);
  });

function game(options) {
   let chosenOptions = [];


   randomChoice(options)

function randomChoice(optionsArray){
  length = optionsArray.length;
  randomNumber1 = Math.floor(Math.random()*length);
  randomNumber2 = Math.floor(Math.random()*length);

  getOptions(randomNumber1, randomNumber2);

function getOptions(num1, num2) {
  button1 = options[num1];
  options.splice([num1],1);
  button2 = options[num2];
  options.splice([num2],1)

  displayOptions(button1, button2);
}

function displayOptions (buttonText1, buttonText2) {
  $("#option3").text(buttonText1);
  $("#option4").text(buttonText2);
};
}
$("#option3").click(function() {
    chosenOptions.push($(this).text())
    randomOptions();
});

$("#option4").click(function() {
    chosenOptions.push($(this).text());
    randomOptions();
});
};

