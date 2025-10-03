// load products from local storage
const products = JSON.parse(localStorage.getItem("favorites")) || [];
const cardItems = document.querySelector(".card-items");
cardItems.style.maxWidth = "100%";
cardItems.innerHTML = "";
products.forEach((id) => {
    // fetch product
    fetch(`https://dummyjson.com/products/${id}`)
        .then((res) => res.json())
        .then((product) => {
            const cart = JSON.parse(localStorage.getItem("cart")) || [];
            const addBtnClassList = cart.includes(product.id)? "add-btn added" : "add-btn";
            cardItems.innerHTML += `<div class="cart-card" id="${product.id}">
                    <div class="product-card">
                        <div class="product-img">
                            <img src="${product.images[0]}" alt="${product.title}" />
                            <button class="fav-btn" id="fav-btn-${product.id}" onclick="removeFavorite(${product.id})">
                                <span>❤️</span>
                            </button>
                            <button class="${addBtnClassList}" id="add-btn-${product.id}" onclick="toggleAddToCart(${product.id})" >+</button>
                        </div>
                        <div class="product-info">
                            <small>${product.category}</small>
                            <div class="product-name">
                                <h3>${product.title}</h3>
                                <span class="price">$${product.price}</span>
                            </div>
                        </div>
                    </div>
                </div>`;
        });
});

// remove favorite
function removeFavorite(productId) {
    // remove card
    const card = document.getElementById(productId);
    card.remove();

    // update local storage
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (favorites.includes(productId)) {
        // remove it
        favorites = favorites.filter((id) => id != productId);
    } else {
        favorites.push(productId);
    }

    // save to local storage
    localStorage.setItem("favorites", JSON.stringify(favorites));
}

// Switch pages
const cartBtn = document.getElementById("cart-btn");
cartBtn.addEventListener("click", () => {
    window.location.href = "cart.html";
});
