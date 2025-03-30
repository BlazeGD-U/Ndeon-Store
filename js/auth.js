document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");

    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;
            const users = JSON.parse(localStorage.getItem("users")) || [];

            const user = users.find(user => user.username === username && user.password === password);
            if (user) {
                localStorage.setItem("loggedUser", JSON.stringify(user));

                if (user.role === "admin") {
                    window.location.href = "../html/admin.html"; // Redirige al panel de admin
                } else {
                    window.location.href = "../html/index.html"; // Redirige a la tienda normal
                }
            } else {
                document.getElementById("loginError").textContent = "Usuario o contraseña incorrectos.";
            }
        });
    }

    if (registerForm) {
        registerForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const fullname = document.getElementById("fullname").value;
            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;
            const users = JSON.parse(localStorage.getItem("users")) || [];

            if (users.some(user => user.username === username)) {
                document.getElementById("registerError").textContent = "El usuario ya existe.";
                return;
            }

            let role = "user"; // Por defecto, un usuario normal
            if (username === "admin" && password === "admin") {
                role = "admin"; // Si el usuario es "admin", darle rol de admin
            }

            users.push({ fullname, username, password, role });
            localStorage.setItem("users", JSON.stringify(users));
            window.location.href = "../html/login.html"; // Redirección al login después del registro exitoso
        });
    }
});



