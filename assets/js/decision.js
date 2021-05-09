$('#start').on('click', timer())

function timer() {
    let timeLeft= 7;

    setInterval(function() {

        if (timeLeft < 0) {
            return;
        } else {
        $("#timer p").text(timeLeft);
        $("#timer p").css("color","orange");

        if (timeLeft <= 3) {
        $("#timer p").css("transition-duration","2000ms");
        $("#timer p").css("color","red");
        }
        if (timeLeft < 2) {
            $("#timer p").css("animation", "flash 500ms 5")
        }
    }
        timeLeft -= 1 
    }, 1000)  
}
    
    

     
    
    




