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
    console.log(cart)
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

// fetch products by url
function fetchProducts(url) {
    let content = "";
    return fetch(url)
        .then((res) => res.json())
        .then((data) => {
            const products = data.products;
            products.forEach((product) => {
                // check if favorited 
                const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
                const spanClassList = favorites.includes(product.id)? "favorited" : "";
                // check if in cart
                const cart = JSON.parse(localStorage.getItem("cart")) || [];
                const itemIndex = cart.findIndex(item => item.id === product.id);
                const addBtnClassList = itemIndex > -1? "add-btn added" : "add-btn";
                // console.log(addBtnClassList);
                content += `
                <div class="product-card">
                <div class="product-img">
                <img src=${product.images[0]} alt=${product.title} />
                <button class="fav-btn" id="fav-btn-${product.id}" onclick="toggleFavorite(${product.id})"><span class="${spanClassList}">🤍</span></button>
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
                `;
            });
            return content;
        })
}

