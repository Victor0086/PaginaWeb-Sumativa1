document.addEventListener("DOMContentLoaded", function () {
    const userGreeting = document.getElementById("user-greeting");
    const loginBtn = document.getElementById("login-btn");
    const logoutBtn = document.getElementById("logout-btn");

    const loggedInUser = localStorage.getItem("loggedInUser");

    if (loggedInUser) {
        // Usuario logueado
        userGreeting.style.display = "block";
        userGreeting.textContent = `Hola, ${loggedInUser}`;
        userGreeting.onclick = function () {
            window.location.href = 'user.html';
        };
        
        logoutBtn.style.display = "block";
        loginBtn.style.display = "none";
    } else {
        // Usuario no logueado
        userGreeting.style.display = "none";
        logoutBtn.style.display = "none";
        loginBtn.style.display = "block";
    }

    // Evento para cerrar sesión
    logoutBtn.addEventListener("click", function () {
        localStorage.removeItem("loggedInUser"); 
        location.reload(); 
    });
});
