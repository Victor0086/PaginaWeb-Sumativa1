// Verifica si el administrador ha iniciado sesión
if (localStorage.getItem("isAdminLoggedIn") !== "true") {
    alert("Debes iniciar sesión como administrador.");
    window.location.href = "ingreso.html"; // Redirigir a la página de login
}

// Mostrar el nombre del administrador
const adminUser = localStorage.getItem("loggedInUser");
if (adminUser) {
    document.getElementById('adminUser').textContent = `Bienvenido, ${adminUser}`;
}

// Manejar el cierre de sesión
document.getElementById('logoutButton').addEventListener('click', function() {
    localStorage.removeItem("isAdminLoggedIn");
    localStorage.removeItem("loggedInUser");
    window.location.href = "ingreso.html";
});

// Redireccionar al Home
document.getElementById('homeButton').addEventListener('click', function() {
    window.location.href = "index.html";
});

// Actualizar estado del pedido
document.getElementById('updateStatus').addEventListener('click', function() {
    const trackingNumber = document.getElementById('trackingNumber').value;
    const newStatus = document.getElementById('orderStatus').value;

    // Recuperar la lista de compras
    const purchases = JSON.parse(localStorage.getItem('purchases')) || [];
    // Buscar la orden con el número de seguimiento correspondiente
    const order = purchases.find(order => order.trackingNumber === trackingNumber);

    if (order) {
        // Actualizar el estado de la orden
        order.estado = newStatus;
        localStorage.setItem('purchases', JSON.stringify(purchases));

        document.getElementById('updateMessage').textContent = "Estado actualizado correctamente.";
    } else {
        document.getElementById('updateMessage').textContent = "Número de seguimiento no encontrado.";
    }
});

// Manejo del formulario de registro para crear usuarios con roles
document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("register-form");
    const nombreCompleto = document.getElementById("nombreCompleto");
    const nombreUsuario = document.getElementById("nombreUsuario");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirmPassword");
    const fechaNacimiento = document.getElementById("fechaNacimiento");
    const direccion = document.getElementById("direccion");
    const rol = document.getElementById("rol");

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        let isValid = true;
        let errorMessage = "";

        // Validaciones de los campos (nombre completo, email, etc.)
        if (!rol.value) {
            isValid = false;
            errorMessage += "Debes seleccionar un rol.\n";
        }

        if (!isValid) {
            alert(errorMessage);
        } else {
            // Crear objeto usuario con los datos y rol
            const usuario = {
                nombreCompleto: nombreCompleto.value,
                nombreUsuario: nombreUsuario.value,
                email: email.value,
                password: password.value,
                fechaNacimiento: fechaNacimiento.value,
                direccion: direccion.value,
                rol: rol.value 
            };

            // Guardar en localStorage
            let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
            usuarios.push(usuario);
            localStorage.setItem('usuarios', JSON.stringify(usuarios));

            alert("Usuario registrado exitosamente con el rol: " + rol.value);
            form.reset(); 
        }
    });
});

