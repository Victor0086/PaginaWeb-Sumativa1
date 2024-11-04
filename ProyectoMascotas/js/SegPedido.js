document.addEventListener('DOMContentLoaded', function() {
    const trackOrderForm = document.getElementById('trackOrderForm');
    const orderStatusDiv = document.getElementById('orderStatus');

    trackOrderForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const orderNumber = document.getElementById('orderNumber').value;
        const purchases = JSON.parse(localStorage.getItem('purchases')) || [];
        const order = purchases.find(p => p.trackingNumber === orderNumber);

        if (order) {
            orderStatusDiv.innerHTML = `
                <div class="alert alert-success" role="alert">
                    Pedido encontrado!<br>
                    Producto: ${order.producto}<br>
                    Estado: ${order.estado}<br>
                    Precio: $${order.total.toFixed(2)}<br>
                    Fecha: ${order.fecha}<br>
                    Número de seguimiento: ${order.trackingNumber}
                </div>
            `;
        } else {
            orderStatusDiv.innerHTML = `
                <div class="alert alert-danger" role="alert">
                    Pedido no encontrado. Verifica el número de seguimiento.
                </div>
            `;
        }
    });
});
