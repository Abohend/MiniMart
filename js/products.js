// fetch all products on start
window.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const query = params.get("query");
    let url = null;

    if (query) {
        url = `https://dummyjson.com/products/search?q=${query}`;
    } else {
        url = "https://dummyjson.com/products";
    }

    fetchProducts(url).then((products) => {
        document.getElementById("products-grid").innerHTML = products;
    });
});

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
                fetchProducts(`https://dummyjson.com/products/category/${cat}`).then((products) => {
                    document.getElementById("products-grid").innerHTML = products;
                });
            });

            catElement.appendChild(btn);
        });
    })
    .catch((err) => console.log(err));

// Search products
function search() {
    query = document.getElementById("search-box").value;
    fetchProducts(`https://dummyjson.com/products/search?q=${query}`).then((products) => {
        document.getElementById("products-grid").innerHTML = products;
    });
}
