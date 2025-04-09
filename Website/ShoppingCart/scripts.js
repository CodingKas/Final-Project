const products = [
  {
    id: 1,
    name: "Emerald Ring",
    price: 2999.99,
    img: "https://rusticandmain.com/cdn/shop/files/the-verdeline-marquise-cut-green-emerald-engagement-ring-natural-diamond-accents_7_800x.jpg?v=1720030857",
    description:
      "Handcrafted 18K gold ring with a radiant emerald centerpiece.",
  },
  {
    id: 2,
    name: "Diamond Necklace",
    price: 5499.99,
    img: "https://images.stockcake.com/public/0/b/4/0b44e588-52f3-458e-a48b-2bc76da2de61_large/elegant-diamond-necklace-stockcake.jpg",
    description: "Brilliant-cut diamonds elegantly set on white gold.",
  },
  {
    id: 3,
    name: "Sapphire Earrings",
    price: 1899.99,
    img: "https://www.lilodiamonds.com/cdn/shop/products/sapphire-pear-diamond-drop-earrings02.jpg?v=1589810344&width=1080",
    description: "Royal blue sapphires encased in platinum.",
  },
];

document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  updateCartCount();
});

function renderProducts() {
  const container = document.getElementById("product-list");

  products.forEach((product) => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <img src="${product.img}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p>${product.description}</p>
      <p><strong>$${product.price.toFixed(2)}</strong></p>
      <button data-id="${product.id}" class="add-to-cart">Add to Cart</button>
    `;
    container.appendChild(div);
  });

  document.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", () => {
      const id = parseInt(button.getAttribute("data-id"));
      addToCart(id);
    });
  });
}

function addToCart(id) {
  const product = products.find((p) => p.id === id);
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const item = cart.find((p) => p.id === id);
  if (item) {
    item.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  let cart;
  try {
    cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (!Array.isArray(cart)) throw new Error("Cart is not an array");
  } catch {
    cart = [];
    localStorage.setItem("cart", JSON.stringify(cart)); // reset it
  }

  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const counter = document.getElementById("cart-count");
  if (counter) counter.textContent = count;
}
