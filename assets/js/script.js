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
                <img class="img-tablet" src="${product.img.tablet}" alt="${product.title}">
                <img class="img-mobile" src="${product.img.mobile}" alt="${product.title}">
                <img class="img-thumbnail" src="${product.img.thumbnail}" alt="${product.title}">
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

            const productInCart = cart.find(item => item.title === product.title);
            if (!productInCart) {
                cart.push({...product, quantity: 1});
            }

            totalAmount += parseFloat(product.price);
            this.classList.add('d-none');

            this.nextElementSibling.classList.remove('d-none');

            updateCart();
        });
    });

    document.addEventListener('click', function (e) {
        if (e.target.classList.contains('increase-quantity')) {
            const productIndex = e.target.getAttribute('data-index');
            const product = products[productIndex];
            const productInCart = cart.find(item => item.title === product.title);

            if (productInCart) {
                productInCart.quantity++;
                totalAmount += parseFloat(productInCart.price);
                const quantityElement = document.querySelector(`.quantity[data-index="${productIndex}"]`);
                quantityElement.textContent = productInCart.quantity;

                updateCart();
            }
        }
    });

    document.addEventListener('click', function (e) {
        if (e.target.classList.contains('decrease-quantity')) {
            const productIndex = e.target.getAttribute('data-index');
            const product = products[productIndex];
            const productInCart = cart.find(item => item.title === product.title);

            if (productInCart) {
                if (productInCart.quantity > 1) {
                    productInCart.quantity--;
                    totalAmount -= parseFloat(productInCart.price);
                    const quantityElement = document.querySelector(`.quantity[data-index="${productIndex}"]`);
                    quantityElement.textContent = productInCart.quantity;
                } else if (productInCart.quantity === 1) {
                    cart = cart.filter(item => item.title !== product.title);
                    totalAmount -= parseFloat(productInCart.price);

                    const itemElement = e.target.closest('.item');
                    itemElement.querySelector('.quantity-container').classList.add('d-none');
                    itemElement.querySelector('.add-cart').classList.remove('d-none');
                }
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