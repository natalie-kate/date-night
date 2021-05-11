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

$("#option1").on("click", stayIn());

function stayIn() {
    let stayInOptions = ["Movie Night", "TV Binge", "Takeaway", "Game Night", "Cook Together", "Video Games", "Cocktail Making", "Pamper Session"];
    let pickedOptions = [];

    randomOptions();

    function randomOptions() {
    let num1 = Math.floor(Math.random()*stayInOptions.length);
    let button1 = stayInOptions.splice([num1],1);
    let num2 = Math.floor(Math.random()*stayInOptions.length);
    let button2 = stayInOptions.splice([num2],1);

    if (stayInOptions.length <= 2) {
        stayInOptions.push(pickedOptions.chosenOption);
    } else if (stayInOptions.length = 1) {
        document.location.href = "result.html";
    }

    $("#option1").text(button1);
    $("#option2").text(button2);

    $("#option1").click(function() {
        let chosenOption = this.innerText;
        pickedOptions.push(chosenOption);
        randomOptions();
    });

    $("#option2").click(function() {
        let chosenOption = this.innerText;
        pickedOptions.push(chosenOption)
        randomOptions(); 
    });

    console.log(pickedOptions);
}};