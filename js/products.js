// Fetch categories list
fetch("https://dummyjson.com/products/category-list")
    .then((res) => res.json())
    .then((categories) => {
        const catElement = document.getElementById("categories");

        categories.forEach((cat) => {
            const btn = document.createElement("button");
            btn.innerText = cat
                .split("-")
                .map((w) => w[0].toUpperCase() + w.slice(1))
                .join(" ");

            // create event listener
            btn.addEventListener("click", () => {
                // remove .clicked from all buttons
                document.querySelectorAll("#categories button").forEach((b) => {
                    b.classList.remove("clicked");
                });

                // add .clicked to the current one
                btn.classList.add("clicked");

                // fetch products for this category
                fetchProducts(`https://dummyjson.com/products/category/${cat}`);
            });

            catElement.appendChild(btn);
        });
    })
    .catch((err) => console.log(err));

// Fetch and render products
function fetchProducts(url) {
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            const products = data.products;
            const container = document.getElementById("products-grid");
            container.innerHTML = "";

            products.forEach((product) => {
                // check if favorited 
                const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
                const spanClassList = favorites.includes(product.id)? "favorited" : "";
                // check if in cart
                const cart = JSON.parse(localStorage.getItem("cart")) || [];
                const addBtnClassList = cart.includes(product.id)? "add-btn added" : "add-btn";
                // console.log(addBtnClassList);
                container.innerHTML += `
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
        })
        .catch((err) => console.log(err));
}

// fetch all products on start
window.onload = () => fetchProducts("https://dummyjson.com/products");

// Search products
function search() {
    query = document.getElementById("search-box").value;
    fetchProducts(`https://dummyjson.com/products/search?q=${query}`);
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
        favorites = favorites.filter(id => id != productId);
    }
    else {
        favorites.push(productId);
    }

    // save to local storage
    localStorage.setItem("favorites", JSON.stringify(favorites));
}