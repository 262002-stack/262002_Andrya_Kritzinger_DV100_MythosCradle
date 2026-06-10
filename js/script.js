let products = [
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


let cart = JSON.parse(localStorage.getItem("cart")) || [];


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


///cart

function addProductToCart(productId) {

    let product = products.find(
        product => product.id === productId
    );

    if (!product) return;

    addToCart(
        product.id,
        product.name,
        product.price
    );

    localStorage.setItem("cart", JSON.stringify(cart));
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
    localStorage.setItem("cart", JSON.stringify(cart));
}

// //remove items
function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);

    updateCart();
    localStorage.setItem("cart", JSON.stringify(cart));
}

// // change amount
function increaseQuantity(id) {

    const item = cart.find(item => item.id === id);

    if (item) {
        item.quantity++;
    }

    updateCart();
    localStorage.setItem("cart", JSON.stringify(cart));
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
    localStorage.setItem("cart", JSON.stringify(cart));
}

// //calculate total price
function calculateTotal() {

    return cart.reduce((total, item) => {
        return total + (item.price * item.quantity);
    }, 0);

}

// //updating cart display
function updateCart() {

    const cartContainer =
        document.getElementById("cartItems");

    cartContainer.innerHTML = "";

    cart.forEach(item => {

        cartContainer.innerHTML += `
            <div class="cartItem">
                <h4>${item.name}</h4>

                <div>
                <button class="modalPlus" onclick="decreaseQuantity(${item.id})">-</button>

                ${item.quantity}

                <button class="modalPlus" onclick="increaseQuantity(${item.id})">+</button>
                </div>

                

                <span>
                    <h3>R${item.price * item.quantity}</h3>
                </span>

                <button class="deleteItem" onclick="removeFromCart(${item.id})">
                    Remove
                </button>
            </div>
        `;
    });

    document.getElementById("cart-total").textContent =
    calculateTotal().toLocaleString();

    localStorage.setItem("cart", JSON.stringify(cart));
}


function clearCart() {
    cart = [];
    updateCart();
    localStorage.setItem("cart", JSON.stringify(cart));

    document.getElementById("item-count").textContent = "0 items";
}
