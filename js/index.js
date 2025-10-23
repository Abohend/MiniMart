// Search products
function search() {
    query = document.getElementById("search-box").value;
    if (query) {
        window.location.href = `products.html?query=${encodeURIComponent(
            query
        )}`;
    }
}

// load hero section products
fetch(`https://dummyjson.com/products/category/mens-shirts`)
    .then((res) => res.json())
    .then((data) => {
        const products = data.products;
        content = "";
        products.forEach((product) => {
            content += `
                    <div class="product-card">
                        <div class="product-img">
                            <img src="${product.images[0]}" alt="${product.title}" />
                        </div>
                        <div class="product-info">
                            <small>${product.category}</small>
                            <div class="product-name">
                                <h3>${product.title}</h3>
                                <span class="price">$${product.price}</span>
                            </div>
                        </div>
                    </div>`;
        });
        const heroGrid = document.getElementById("new-collection-grid");
        heroGrid.innerHTML = content;
    });

const grid = document.getElementById("new-collection-grid");
const scrollAmount = grid.offsetWidth;

document
    .querySelector(".hero-controls .arrow-btn.left-arr")
    .addEventListener("click", () => {
        grid.scrollLeft -= scrollAmount;
    });

document
    .querySelector(".hero-controls .arrow-btn.right-arr")
    .addEventListener("click", () => {
        grid.scrollLeft += scrollAmount;
    });

// load new this week products
const newThisWeekGrid = document.getElementById("watch-collection-grid");
fetch(`https://dummyjson.com/products/category/mens-watches`)
    .then((res) => res.json())
    .then((data) => {
        const products = data.products;
        content = "";
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        products.forEach((product) => {
                const itemIndex = cart.findIndex(item => item.id === product.id);
                const addBtnClassList = itemIndex > -1? "add-btn added" : "add-btn";
            content += `
                    <div class="product-card">
                        <div class="product-img">
                            <img src="${product.images[0]}" alt="${product.title}" />
                            <button class="add-btn" onclick="toggleAddToCart(${product.id})">+</button>
                        </div>
                        <div class="product-info">
                            <small>${product.category}</small>
                            <div class="product-name">
                                <h3>${product.title}</h3>
                                <span class="price">$${product.price}</span>
                            </div>
                        </div>
                    </div>`;
        });
        newThisWeekGrid.innerHTML = content;
    });

const newThisWeekElem = document.querySelector("#new-collection-grid");
const scrollAmount2 = newThisWeekElem.offsetWidth;

document
    .querySelector(".products-section .arrow-btn.left-arr")
    .addEventListener("click", () => {
        newThisWeekGrid.scrollLeft -= scrollAmount2;
    });

document
    .querySelector(".products-section .arrow-btn.right-arr")
    .addEventListener("click", () => {
        newThisWeekGrid.scrollLeft += scrollAmount2;
    });
