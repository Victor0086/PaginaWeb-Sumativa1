document.addEventListener('DOMContentLoaded', function() {
    const cartItemsBody = document.getElementById('cart-items-body');
    const cartTotal = document.getElementById('cart-total');
    const cartEmptyMessage = document.getElementById('cart-empty-message');
    const cartItemsSection = document.getElementById('cart-items');

    function loadCart() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        console.log(cart);

        if (cart.length === 0) {
            cartEmptyMessage.classList.remove('d-none');
            cartItemsSection.classList.add('d-none');
            return;
        }

        cartEmptyMessage.classList.add('d-none');
        cartItemsSection.classList.remove('d-none');
        
        let total = 0;
        cartItemsBody.innerHTML = '';

        cart.forEach(item => {
            const subtotal = item.price * item.quantity;
            total += subtotal;

            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.name}</td>
                <td>$${item.price.toFixed(2)}</td>
                <td>${item.quantity}</td>
                <td>$${subtotal.toFixed(2)}</td>
                <td><button class="btn btn-danger btn-sm remove-item" data-id="${item.id}">Eliminar</button></td>
            `;
            cartItemsBody.appendChild(row);
        });

        cartTotal.textContent = total.toFixed(2);
    }

    loadCart();

    // Eliminar un producto al hacer clic en el botón "Eliminar"
    cartItemsBody.addEventListener('click', (event) => {
        if (event.target.classList.contains('remove-item')) {
            const productId = event.target.getAttribute('data-id');
            let cart = JSON.parse(localStorage.getItem('cart')) || [];

            // Elimina el producto del carrito
            cart = cart.filter(item => item.id !== productId);
            localStorage.setItem('cart', JSON.stringify(cart));
            loadCart();
        }
    });

    // Botón "Seguir Comprando" redirige a index.html
    document.querySelector('.continue-shopping').addEventListener('click', function() {
        window.location.href = 'index.html';
    });

    // Botón "Finalizar Compra"
    const finalizePurchaseButton = document.querySelector('.finalize-purchase');
    if (!finalizePurchaseButton.dataset.eventAdded) { 
        finalizePurchaseButton.addEventListener('click', finalizePurchase);
        finalizePurchaseButton.dataset.eventAdded = 'true';
    }

    function generateTrackingNumber() {
        return Math.floor(Math.random() * 1000000).toString(); // Genera un número aleatorio
    }

    function finalizePurchase() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        if (cart.length === 0) {
            alert('El carrito está vacío.');
            return;
        }

        const purchases = JSON.parse(localStorage.getItem('purchases')) || [];
        const today = new Date().toLocaleDateString();

        cart.forEach(item => {
            const purchase = {
                producto: item.name,
                precio: item.price,
                cantidad: item.quantity,
                total: item.price * item.quantity,
                fecha: today,
                trackingNumber: generateTrackingNumber() // Genera y agrega el número de seguimiento
            };
            purchases.push(purchase);
        });

        localStorage.setItem('purchases', JSON.stringify(purchases));
        localStorage.removeItem('cart');
        alert('Compra finalizada con éxito! Tu número de seguimiento es: ' + purchases[purchases.length - 1].trackingNumber); 
        window.location.href = 'user.html'; 
    }
});
