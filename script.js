// ================== ADVANCED CART SYSTEM ==================

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartCount = document.getElementById("cart-count");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const cartIcon = document.getElementById("cart-icon");
const cartSidebar = document.getElementById("cart-sidebar");

// Update Cart UI
function updateCartUI() {
    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price;

        const li = document.createElement("li");
        li.innerHTML = `
            ${item.name} - ₹${item.price}
            <button onclick="removeItem(${index})">❌</button>
        `;
        cartItems.appendChild(li);
    });

    cartCount.textContent = cart.length;
    cartTotal.textContent = total;

    localStorage.setItem("cart", JSON.stringify(cart));
}

// Add to Cart
document.querySelectorAll(".buy-btn").forEach(button => {
    button.addEventListener("click", function () {

        const productCard = this.parentElement;
        const name = productCard.querySelector("h3").textContent;
        const priceText = productCard.querySelector(".price").textContent;
        const price = parseInt(priceText.replace("₹", ""));

        cart.push({ name, price });
        updateCartUI();
    });
});

// Remove Item
function removeItem(index) {
    cart.splice(index, 1);
    updateCartUI();
}

// Clear Cart
function clearCart() {
    cart = [];
    updateCartUI();
}

// Toggle Cart Sidebar
cartIcon.addEventListener("click", function (e) {
    e.preventDefault();
    cartSidebar.classList.toggle("active");
});

// Load Cart on Page Load
updateCartUI();