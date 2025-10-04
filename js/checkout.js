const ordersContainer = document.getElementById("orders-container");
ordersContainer.innerHTML = "";
const cart = JSON.parse(localStorage.getItem("cart")) || [];
const shipping = 5;
const subtotalElem = document.getElementById("subtotal");
const totalElem = document.getElementById("total");
let total = 0;

const productsCntr = document.querySelector(".right-section h2 span");
productsCntr.innerText = `(${cart.length})`;

Promise.all(
    cart.map((item) =>
        fetch(`https://dummyjson.com/products/${item.id}`)
            .then((res) => res.json())
            .then((product) => {
                total += product.price * item.amount;

                const orderItem = document.createElement("div");
                orderItem.classList.add("order-item");
                orderItem.innerHTML = `
                    <div class="item-image">
                        <img src="${product.images[0]}" alt="${product.title}" />
                    </div>
                    <div class="item-details">
                        <div class="item-name">${product.title}</div>
                        <div class="item-quantity">(${item.amount})</div>
                    </div>
                    <div class="item-actions">
                        <div class="item-price">$${(product.price * item.amount).toFixed(2)}</div>
                    </div>
                `;
                ordersContainer.appendChild(orderItem);
            })
    )
).then(() => {
    subtotalElem.innerText = `$${total.toFixed(2)}`;
    totalElem.innerText = `$${(total + shipping).toFixed(2)}`;
});