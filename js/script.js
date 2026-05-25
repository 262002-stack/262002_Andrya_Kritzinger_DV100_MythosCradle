// let test = () => {
//     document.getElementById("sneeky").textContent = "Added to cart!";
// };

// document.getElementById("sneeky").addEventListener("click",test);

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() 
{
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() 
{
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}


///////form stuff :P

let bigForm = document.getElementById("bigForm")
let username = document.getElementById("name")
let welcomeMessage = document.getElementById("welcomeMessage")

//message

let currentUsername = username.value.trim();
displayWelcomeMessage(currentUsername);

//displays message 
let displayWelcomeMessage = (currentUsername) =>
{
  //crate output send with innerhtml to right place 
  let output = `Welcome, ${currentUsername}!`;
  welcomeMessage.innerHTML = output;

};

bigForm.addEventListener("submit");
