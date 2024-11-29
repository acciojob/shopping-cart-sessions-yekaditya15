// Product data
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// DOM elements
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartBtn = document.getElementById("clear-cart-btn");

// Helper: Get cart from session storage
function getCart() {
  const cart = sessionStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
}

// Helper: Save cart to session storage
function saveCart(cart) {
  sessionStorage.setItem("cart", JSON.stringify(cart));
}

// Render product list
function renderProducts() {
  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${product.name} - $${product.price} 
      <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
    `;
    productList.appendChild(li);
  });
}

// Render cart list
function renderCart() {
  const cart = getCart();
  cartList.innerHTML = ""; // Clear previous cart items

  if (cart.length === 0) {
    cartList.innerHTML = "<li>Cart is empty</li>";
    return;
  }

  cart.forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.name} - $${item.price}
      <button class="remove-from-cart-btn" data-id="${item.id}">Remove</button>
    `;
    cartList.appendChild(li);
  });
}

// Add item to cart
function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  const cart = getCart();

  cart.push(product); // Add product to cart
  saveCart(cart); // Save updated cart to session storage
  renderCart(); // Re-render cart
}

// Remove item from cart
function removeFromCart(productId) {
  let cart = getCart();

  // Remove product with the given ID from the cart
  cart = cart.filter((item) => item.id !== productId);
  saveCart(cart); // Save updated cart to session storage
  renderCart(); // Re-render cart
}

// Clear cart
function clearCart() {
  sessionStorage.removeItem("cart"); // Clear cart data from session storage
  renderCart(); // Re-render cart
}

// Event listeners
productList.addEventListener("click", (event) => {
  if (event.target.classList.contains("add-to-cart-btn")) {
    const productId = parseInt(event.target.dataset.id, 10);
    addToCart(productId);
  }
});

cartList.addEventListener("click", (event) => {
  if (event.target.classList.contains("remove-from-cart-btn")) {
    const productId = parseInt(event.target.dataset.id, 10);
    removeFromCart(productId);
  }
});

clearCartBtn.addEventListener("click", clearCart);

// Initial render
renderProducts();
renderCart();
