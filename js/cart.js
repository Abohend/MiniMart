// Switch pages
const favBtn = document.getElementById("fav-btn");
if (favBtn) {
    favBtn.addEventListener("click", () => {
        window.location.href = "favorites.html";
    });
}

// load products from local storage
const cart = JSON.parse(localStorage.getItem("cart")) || [];
const cardItems = document.querySelector(".card-items");
cardItems.style.maxWidth = "100%";
cardItems.innerHTML = "";
const subtotalElem = document.getElementById("subtotal");
const totalElem = document.getElementById("total");
const shipping = 5;
let total = 0;

Promise.all(
    cart.map((item) =>
        fetch(`https://dummyjson.com/products/${item.id}`)
            .then((res) => res.json())
            .then((product) => {
                total += product.price * item.amount;

                const favorites =
                    JSON.parse(localStorage.getItem("favorites")) || [];
                const spanClassList = favorites.includes(product.id)
                    ? "favorited"
                    : "";

                const cartItem = cart.find((i) => i.id === product.id);
                const cartAmount = cartItem ? cartItem.amount : 0;

                cardItems.innerHTML += `
          <div class="cart-card">
            <div class="product-card">
              <div class="product-img">
                <img src="${product.images[0]}" alt="${product.title}" />
                <button class="fav-btn" id="fav-btn-${product.id}" onclick="toggleFavorite(${product.id})">
                  <span class="${spanClassList}">🤍</span>
                </button>
              </div>
              <div class="product-info">
                <small>${product.category}</small>
                <div class="product-name">
                  <h3>${product.title}</h3>
                  <span class="price">$${product.price}</span>
                </div>
              </div>
            </div>

            <div class="card-controller">
              <button class="delete-btn" onclick="removeFromCart(${product.id})">✖</button>
              <div class="card-item-count">
                <button onclick="updateCart(${product.id}, 1)">+</button>
                <input type="number" value="${cartAmount}" />
                <button onclick="updateCart(${product.id}, -1)">-</button>
              </div>
            </div>
          </div>`;
            })
    )
).then(() => {
    // Now all fetches are done, update totals
    subtotalElem.innerText = `$${total.toFixed(2)}`;
    totalElem.innerText = `$${(total + shipping).toFixed(2)}`;
});

// update cart item amount
function updateCart(productId, change) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const itemIndex = cart.findIndex((item) => item.id === productId);
    if (itemIndex > -1) {
        cart[itemIndex].amount += change;
        if (cart[itemIndex].amount <= 0) {
            cart.splice(itemIndex, 1); // remove item if amount is 0 or less
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        location.reload(); // reload to reflect changes
    }
}

// remove item from cart
function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.filter((item) => item.id !== productId);
    localStorage.setItem("cart", JSON.stringify(cart));
    location.reload(); // reload to reflect changes
}
