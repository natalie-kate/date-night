let sendForm = document.getElementById("contact-form");
sendForm.addEventListener('submit', contactForm);
let response = document.getElementById("response");
let submitbutton = document.getElementById("submit-button");

function contactForm(event) {
    event.preventDefault();
    let firstName = sendForm.elements[1].value;
    let email = sendForm.elements[3].value;
    let comment = sendForm.elements[4].value;
    let responseText = `
    <h4>Thanks ${firstName}</h4>
    <p> The message submitted was: "${comment}"<br>
    We'll get back to you as soon as possible via ${email}.<br>
    Have an amazing Date night! <i class="fas fa-heart"</p>`;
    response.innerHTML = responseText;
}
