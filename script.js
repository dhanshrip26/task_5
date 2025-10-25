// Sample product data
const products = [
  { id: 1, name: "classic tee", price: 1299, image: "shirt claasic tee.jpeg" },
  { id: 2, name: "sneakers x",price: 2599, image: "download.jpeg" },
  { id: 3, name: "bagpack", price: 1899, image: "download (2).jpeg" },
  { id: 4, name: "watch", price: 999, image: "images (2).jpeg"},
  
];

const productList = document.getElementById("productList");
const template = document.getElementById("productCard");
const searchInput = document.getElementById("search");
const cartBtn = document.getElementById("cartBtn");
const cartModal = document.getElementById("cartModal");
const closeCart = document.getElementById("closeCart");
const cartItemsDiv = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");
const checkoutBtn = document.getElementById("checkoutBtn");

let cart = [];

// 🛒 Render all products
function renderProducts(items) {
  productList.innerHTML = "";
  items.forEach(prod => {
    const card = template.content.cloneNode(true);
    card.querySelector(".prod-img").src = prod.image;
    card.querySelector(".prod-img").alt = prod.name;
    card.querySelector(".prod-title").textContent = prod.name;
    card.querySelector(".prod-price").textContent = `₹${prod.price}`;
    card.querySelector(".addBtn").addEventListener("click", () => addToCart(prod.id));
    card.querySelector(".viewBtn").addEventListener("click", () => viewProduct(prod));
    productList.appendChild(card);
  });
}

// 🔍 Search functionality
searchInput.addEventListener("input", e => {
  const query = e.target.value.toLowerCase();
  const filtered = products.filter(p => p.name.toLowerCase().includes(query));
  renderProducts(filtered);
});

// ➕ Add to cart
function addToCart(id) {
  const product = products.find(p => p.id === id);
  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  updateCart();
}

// 🔄 Update cart
function updateCart() {
  cartItemsDiv.innerHTML = "";
  let total = 0;
  cart.forEach(item => {
    total += item.price * item.qty;
    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <p>${item.name} (x${item.qty}) - ₹${item.price * item.qty}</p>
      <button class="removeBtn">Remove</button>
    `;
    div.querySelector(".removeBtn").addEventListener("click", () => removeFromCart(item.id));
    cartItemsDiv.appendChild(div);
  });

  cartCount.textContent = cart.reduce((a, c) => a + c.qty, 0);
  cartTotal.textContent = total;
}

// ➖ Remove from cart
function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  updateCart();
}

// 👁 View product (simple alert for now)
function viewProduct(prod) {
  alert(`Product: ${prod.name}\nPrice: ₹${prod.price}`);
}

// 🛍 Checkout
checkoutBtn.addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }
  alert("Thank you for your purchase!");
  cart = [];
  updateCart();
  cartModal.close();
});

// 🧩 Cart modal control
cartBtn.addEventListener("click", () => cartModal.showModal());
closeCart.addEventListener("click", () => cartModal.close());

// Initial render
renderProducts(products);
