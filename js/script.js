// let test = () => {
//     document.getElementById("sneeky").textContent = "Added to cart!";
// };

// document.getElementById("sneeky").addEventListener("click",test);

// Get the modal
// var modal = document.getElementById("myModal");

// // Get the button that opens the modal
// var btn = document.getElementById("myBtn");

// // Get the <span> element that closes the modal
// var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
// btn.onclick = function() 
// {
//   modal.style.display = "block";
// }

// When the user clicks on <span> (x), close the modal
// span.onclick = function() 
// {
//   modal.style.display = "none";
// }

// // When the user clicks anywhere outside of the modal, close it
// window.onclick = function(event) {
//   if (event.target == modal) {
//     modal.style.display = "none";
//   }
// }


///////form stuff :P

let bigForm = document.forms['bigForm'];
bigForm.addEventListener("submit",welcomeMessage);

function welcomeMessage(event){
  event.preventDefault();
  let username = document.getElementById("name").value;
  let output = `
    Thank you ${username} we will get back to you as soon as possible
  `;
  document.querySelector(".outputContainer").innerHTML = output;
  let thankYouModal = new bootstrap.Modal(document.getElementById('thankYouModal'));
  thankYouModal.show();
  


};


//message

// let currentUsername = username.value.trim();
// displayWelcomeMessage(currentUsername);

// //displays message 
// let displayWelcomeMessage = (currentUsername) =>
// {
//   //crate output send with innerhtml to right place 
//   let output = `Welcome, ${currentUsername}!`;
//   welcomeMessage.innerHTML = output;

// };

let cart = [];


const products = [
  {
    name: "Azuron",
    price: 2500,
    id: 0,
    quantity: 1,
    description: "Blue Dragon",
  },
  {
    name: "Yuki",
    price: 4500,
    id: 1,
    quantity: 1,
    description: "Kitsune",
  },
  {
    name: "Aurelia",
    price: 6500,
    id: 2,
    quantity: 1,
    description: "Griffin",
  },
  {
    name: "Lumina",
    price: 40000,
    id: 3,
    quantity: 1,
    description: "Water Wisp",
  },
  {
    name: "Starwind",
    price: 5000,
    id: 4,
    quantity: 1,
    description: "Pegasus",
  },
  {
    name: "Brair",
    price: 3500,
    id: 5,
    quantity: 1,
    description: "Forest Spirit",
  },
];

function addProductToCart(productId) {

    const product = products.find(
        product => product.id === productId
    );

    if (!product) return;

    addToCart(
        product.id,
        product.name,
        product.price
    );
}

function addToCart(id, name, price) {

    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            id: id,
            name: name,
            price: price,
            quantity: 1
        });
    }

    updateCart();
    const totalItems = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
);

document.getElementById("item-count").textContent =
    `${totalItems} item${totalItems !== 1 ? "s" : ""}`;
}

//remove items
function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);

    updateCart();
}

// change amount
function increaseQuantity(id) {

    const item = cart.find(item => item.id === id);

    if (item) {
        item.quantity++;
    }

    updateCart();
}

function decreaseQuantity(id) {

    const item = cart.find(item => item.id === id);

    if (item) {

        item.quantity--;

        if (item.quantity <= 0) {
            removeFromCart(id);
        }
    }

    updateCart();
}

//calculate total price
function calculateTotal() {

    return cart.reduce((total, item) => {
        return total + (item.price * item.quantity);
    }, 0);

}

//updating cart display
function updateCart() {

    const cartContainer =
        document.getElementById("cartItems");

    cartContainer.innerHTML = "";

    cart.forEach(item => {

        cartContainer.innerHTML += `
            <div>
                <h4>${item.name}</h4>

                <button onclick="decreaseQuantity(${item.id})">-</button>

                ${item.quantity}

                <button onclick="increaseQuantity(${item.id})">+</button>

                <span>
                    R${item.price * item.quantity}
                </span>

                <button onclick="removeFromCart(${item.id})">
                    Remove
                </button>
            </div>
        `;
    });

    document.getElementById("cart-total").textContent =
    calculateTotal().toLocaleString();
}