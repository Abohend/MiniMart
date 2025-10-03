// toggle add to cartBtn
function toggleAddToCart(productId) {
    // Get cart from localStorage or initialize
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const addBtn = document.getElementById(`add-btn-${productId}`);

    const itemIndex = cart.findIndex(item => item.id === productId);

    if (itemIndex > -1) {
        // Remove from cart
        cart = cart.filter((item) => item.id !== productId);
        if (addBtn) addBtn.classList.remove("added");
    } else {
        // Add to cart
        cart.push({ id: productId, amount: 1 });
        if (addBtn) addBtn.classList.add("added");
    }

    // Save updated cart
    localStorage.setItem("cart", JSON.stringify(cart));
}

// toggle favortite
function toggleFavorite(productId) {
    // change the style
    const spanFavIcon = document.querySelector(`#fav-btn-${productId} span`);
    spanFavIcon.classList.toggle("favorited");

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
