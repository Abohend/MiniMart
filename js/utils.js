// toggle add to cartBtn
function toggleAddToCart(productId) {
    // Get cart from localStorage or initialize
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const addBtn = document.getElementById(`add-btn-${productId}`);

    if (cart.includes(productId)) {
        // Remove from cart
        cart = cart.filter(id => id != productId);
        if (addBtn) addBtn.classList.remove("added");
    } else {
        // Add to cart
        cart.push(productId);
        if (addBtn) addBtn.classList.add("added");
    }

    // Save updated cart
    localStorage.setItem("cart", JSON.stringify(cart));
}
