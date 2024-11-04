document.addEventListener("DOMContentLoaded", function() {
    const loggedInUser = localStorage.getItem("loggedInUser");
    const username = localStorage.getItem("username");
    const userGreeting = document.getElementById("user-greeting");
    const loginBtn = document.getElementById("login-btn");
    const searchBar = document.getElementById("search-bar");
    const welcomeMessage = document.getElementById("welcome-message");
    const purchasesList = document.getElementById("purchases-list");
    const purchasesListBody = document.getElementById("purchases-list-body");
    const purchasesEmptyMessage = document.getElementById("purchases-empty-message");
    const logoutBtn = document.getElementById("logout-btn");

    // Formato para precios en CLP
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(amount);
    };

    // Si el usuario ha iniciado sesión
    if (loggedInUser) {
        userGreeting.textContent = `Hola, ${loggedInUser}`;
        userGreeting.style.display = "block";
        userGreeting.onclick = function() {
            window.location.href = 'user.html';
        };
        loginBtn.style.display = "none";

        if (searchBar && welcomeMessage) {
            searchBar.style.display = "none"; 
            welcomeMessage.style.display = "block"; // Muestra el mensaje de bienvenida
        }

        // Manejo del botón de cerrar sesión
        if (logoutBtn) {
            logoutBtn.style.display = "block"; 
            logoutBtn.addEventListener('click', function() {
                console.log('Cerrando sesión...'); 
                localStorage.removeItem("loggedInUser"); 
                localStorage.removeItem("username"); 
                window.location.href = '../index.html';
            });
        }

        // Manejo de la lista de compras
        const purchases = JSON.parse(localStorage.getItem('purchases')) || [];
        if (purchases.length === 0) {
            purchasesEmptyMessage.classList.remove("d-none");
            purchasesList.classList.add("d-none");
        } else {
            purchasesEmptyMessage.classList.add("d-none");
            purchasesList.classList.remove("d-none");

            purchases.forEach(purchase => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${purchase.producto}</td>
                    <td>${formatCurrency(purchase.precio)}</td>
                    <td>${purchase.cantidad}</td>
                    <td>${formatCurrency(purchase.total)}</td>
                    <td>${purchase.fecha}</td>
                    <td>${purchase.trackingNumber || 'No disponible'}</td> 
                `;
                purchasesListBody.appendChild(row);
            });
        }
    } else {
        if (searchBar && welcomeMessage) {
            searchBar.style.display = "block"; 
            welcomeMessage.style.display = "none"; 
        }
    }
});
