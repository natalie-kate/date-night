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
                $("#timer p").css("animation", "flash 500ms 5")
            }
        }
        timeLeft -= 1
    }, 1000)
}

$('#option1').click(function() {

    $("#option1").attr('id', 'option3');
    $("#option2").attr('id', 'option4');
    const stayInOptions = ["Movie Night", "TV Binge", "Takeaway", "Game Night", "Cook Together", "Video Games", "Cocktail Making", "Pamper Session"];

    randomOptions();

    function randomOptions() {
    let num1 = Math.floor(Math.random()*stayInOptions.length);
    let button1 = stayInOptions.splice([num1],1);
    let num2 = Math.floor(Math.random()*stayInOptions.length);
    let button2 = stayInOptions.splice([num2],1);
    let chosenOptions = [];
    
    $("#option3").text(button1);
    $("#option4").text(button2);

    $("#option3").click(function() {
        let chosenOption = $("#option3").text();
        console.log(chosenOption);
        randomOptions();
    });
    $("#option4").click(function() {
        chosenOptions.push($("#option3").text())
        randomOptions();
    });
    console.log(chosenOptions);
}})