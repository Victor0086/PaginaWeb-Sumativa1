document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("register-form");
    const nombreCompleto = document.getElementById("nombreCompleto");
    const nombreUsuario = document.getElementById("nombreUsuario");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirmPassword");
    const fechaNacimiento = document.getElementById("fechaNacimiento");
    const direccion = document.getElementById("direccion"); 

    // Guardar las credenciales de administrador en localStorage (esto es solo para demostración)
    localStorage.setItem("adminUser", "admin"); // Nombre de usuario de admin
    localStorage.setItem("adminPassword", "admin123"); // Contraseña de admin

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        let isValid = true;
        let errorMessage = "";

        // Validación de campos no vacíos
        if (!nombreCompleto.value.trim()) {
            isValid = false;
            errorMessage += "El nombre completo es obligatorio.\n";
        }
        if (!nombreUsuario.value.trim()) {
            isValid = false;
            errorMessage += "El nombre de usuario es obligatorio.\n";
        }
        if (!email.value.trim()) {
            isValid = false;
            errorMessage += "El correo electrónico es obligatorio.\n";
        }
        if (!password.value.trim()) {
            isValid = false;
            errorMessage += "La contraseña es obligatoria.\n";
        }
        if (!confirmPassword.value.trim()) {
            isValid = false;
            errorMessage += "La confirmación de la contraseña es obligatoria.\n";
        }
        if (!fechaNacimiento.value.trim()) {
            isValid = false;
            errorMessage += "La fecha de nacimiento es obligatoria.\n";
        }

        // Validación de formato de correo electrónico
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email.value && !emailRegex.test(email.value)) {
            isValid = false;
            errorMessage += "El correo electrónico no tiene un formato válido.\n";
        }

        // Validación de contraseñas iguales
        if (password.value !== confirmPassword.value) {
            isValid = false;
            errorMessage += "Las contraseñas no coinciden.\n";
        }

        // Validación de longitud de la contraseña
        if (password.value.length < 6 || password.value.length > 18) {
            isValid = false;
            errorMessage += "La contraseña debe tener entre 6 y 18 caracteres.\n";
        }

        // Validación de complejidad de la contraseña
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d).+$/;
        if (password.value && !passwordRegex.test(password.value)) {
            isValid = false;
            errorMessage += "La contraseña debe contener al menos una letra mayúscula y un número.\n";
        }

        // Validación de la edad mínima
        const today = new Date();
        const birthDate = new Date(fechaNacimiento.value);
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        if (age < 18) {
            isValid = false;
            errorMessage += "Debes tener al menos 18 años para registrarte.\n";
        }

        // Verificar si el usuario ya está registrado
        if (isValid) {
            let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
            const existingUser = usuarios.find(user => user.nombreUsuario === nombreUsuario.value || user.email === email.value);

            if (existingUser) {
                alert("Este usuario ya está registrado. Por favor, elige otro nombre de usuario o correo electrónico.");
                return; // Detener el registro
            } else {
                // Si es válido, guardar el usuario en localStorage
                const usuario = {
                    nombreCompleto: nombreCompleto.value,
                    nombreUsuario: nombreUsuario.value,
                    email: email.value,
                    password: password.value,
                    fechaNacimiento: fechaNacimiento.value,
                    direccion: direccion.value,
                };

                // Agregar el nuevo usuario al array de usuarios
                usuarios.push(usuario);
                
                // Guardar de nuevo en localStorage
                localStorage.setItem('usuarios', JSON.stringify(usuarios));

                alert("Usuario registrado exitosamente!");
                form.reset(); // Limpia el formulario
            }
        } else {
            alert(errorMessage);
        }
    });

    // Validaciones para el formulario de acceso
    const loginForm = document.getElementById("login-form");
    const loginEmail = document.getElementById("loginEmail");
    const loginPassword = document.getElementById("loginPassword");

    loginForm.addEventListener("submit", function(event) {
        event.preventDefault();

        let isValid = true;
        let errorMessage = "";

        if (!loginEmail.value.trim()) {
            isValid = false;
            errorMessage += "El correo electrónico o nombre de usuario es obligatorio.\n";
        }
        if (!loginPassword.value.trim()) {
            isValid = false;
            errorMessage += "La contraseña es obligatoria.\n";
        }

        if (!isValid) {
            alert(errorMessage);
        } else {
            // Verificar usuarios registrados
            const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
            const usuarioEncontrado = usuarios.find(usuario => 
                (usuario.email === loginEmail.value || usuario.nombreUsuario === loginEmail.value) && 
                usuario.password === loginPassword.value
            );

            // Verificar credenciales del administrador
            const storedUser = localStorage.getItem("adminUser");
            const storedPassword = localStorage.getItem("adminPassword");

            if (loginEmail.value === storedUser && loginPassword.value === storedPassword) {
                localStorage.setItem("isAdminLoggedIn", "true");
                window.location.href = "admin.html"; 
            } else if (usuarioEncontrado) {
                localStorage.setItem("loggedInUser", usuarioEncontrado.nombreUsuario); 
                alert("Acceso exitoso!");
                window.location.href = "user.html"; 
            } else {
                alert("Las credenciales no son correctas.");
            }
        }
    });
});
