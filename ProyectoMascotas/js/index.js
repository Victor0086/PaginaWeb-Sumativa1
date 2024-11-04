document.addEventListener('DOMContentLoaded', function() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productId = button.getAttribute('data-id');
            const productName = button.getAttribute('data-name');
            const productPrice = parseFloat(button.getAttribute('data-price'));

            // Recuperar el carrito actual desde localStorage o inicializarlo si no existe
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            
            // Buscar si el producto ya está en el carrito
            const existingProduct = cart.find(item => item.id === productId);
            
            if (existingProduct) {
                // Si el producto ya está en el carrito, aumenta la cantidad
                existingProduct.quantity += 1;
            } else {
                // Si no está, agregarlo como un nuevo producto
                cart.push({ id: productId, name: productName, price: productPrice, quantity: 1 });
            }

            // Guardar el carrito actualizado en localStorage
            localStorage.setItem('cart', JSON.stringify(cart));

            // Actualizar el contador del carrito
            updateCartCount();
        });
    });

    // Función para actualizar el contador de productos en el icono del carrito
    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
        document.querySelector('.cart-count').textContent = cartCount;
    }

    // Inicializar el contador del carrito al cargar la página
    updateCartCount();
});
