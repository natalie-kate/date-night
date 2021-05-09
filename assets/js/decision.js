$('#start').on('click', timer())

function timer() {
    let timeLeft= 7;

    setInterval(function() {

        if (timeLeft < 0) {
            return;
        } else {
        $("#timer p").text(timeLeft);
        } timeLeft -= 1 
    }, 1000)  
}
    

     
    
    




