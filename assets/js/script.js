let cart = [];
let totalAmount = 0;

document.addEventListener('DOMContentLoaded', function () {
    const menu = document.getElementById('menu');
    const cartElement = document.querySelector('.cart');
    const totalElement = cartElement.querySelector('.total');
    const cartCountElement = cartElement.querySelector('h2');

    products.forEach((product, index) => {
        menu.insertAdjacentHTML('beforeend', `
                <div class="item">
                    <div class="container-img">
                        <img class="img-desktop" src="${product.img.desktop}" alt="${product.title}">
                        <img class="img-mobile" src="${product.img.mobile}" alt="${product.title}">
                    </div>
                    <button class="add-cart" data-index="${index}">
                        <i class="fa-solid fa-shopping-cart"></i>Add to Cart
                    </button>
                    <div class="quantity-container d-none">
                        <i class="fa-solid fa-plus increase-quantity" data-index="${index}"></i>
                        <p class="quantity" data-index="${index}">1</p>
                        <i class="fa-solid fa-minus decrease-quantity" data-index="${index}"></i>
                    </div>
                    <div class="item-description">
                        <small>${product.name}</small>
                        <p class="title">${product.title}</p>
                        <p class="price">$${product.price}</p>
                    </div>
                </div>
            `);
    });

    document.querySelectorAll('.add-cart').forEach(button => {
        button.addEventListener('click', function () {
            const productIndex = this.getAttribute('data-index');
            const product = products[productIndex];

            cart.push({...product, quantity: 1});
            totalAmount += parseFloat(product.price);
            this.classList.add('d-none');

            this.nextElementSibling.classList.remove('d-none');

            updateCart();
        });
    });

    document.addEventListener('click', function (e) {
        if (e.target.classList.contains('increase-quantity')) {
            const productIndex = e.target.getAttribute('data-index');
            const quantityElement = document.querySelector(`.quantity[data-index="${productIndex}"]`);
            let quantity = parseInt(quantityElement.textContent);
            quantity++;
            quantityElement.textContent = quantity;

            cart[productIndex].quantity = quantity;
            totalAmount += parseFloat(cart[productIndex].price);
            updateCart();
        }
    });

    document.addEventListener('click', function (e) {
        if (e.target.classList.contains('decrease-quantity')) {
            const productIndex = e.target.getAttribute('data-index');
            const quantityElement = document.querySelector(`.quantity[data-index="${productIndex}"]`);
            let quantity = parseInt(quantityElement.textContent);

            if (quantity > 1) {
                quantity--;
                quantityElement.textContent = quantity;

                cart[productIndex].quantity = quantity;
                totalAmount -= parseFloat(cart[productIndex].price);
                updateCart();
            }
        }
    });

    function updateCart() {
        cartElement.innerHTML = `
                <h2>Your Cart (${cart.reduce((sum, item) => sum + item.quantity, 0)})</h2>
                ${cart.map(item => `
                    <div class="cart-item">
                        <span>${item.title} (x${item.quantity})</span>
                        <span>$${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                `).join('')}
                <p class="total">Total: $${totalAmount.toFixed(2)}</p>
                <p class="carbon-neutral">🌿 This is a carbon-neutral delivery</p>
                <button class="confirm-order">Confirm Order</button>
            `;
    }
});