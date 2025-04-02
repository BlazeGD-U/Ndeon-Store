document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");

    // Función para validar la contraseña
    function validarContraseña(password) {
        const minLength = 8;
        const tieneMayuscula = /[A-Z]/.test(password);
        const tieneMinuscula = /[a-z]/.test(password);
        const tieneNumero = /[0-9]/.test(password);
        const tieneCaracterEspecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        if (password.length < minLength) {
            return "La contraseña debe tener al menos 8 caracteres.";
        }
        if (!tieneMayuscula) {
            return "La contraseña debe contener al menos una mayúscula.";
        }
        if (!tieneMinuscula) {
            return "La contraseña debe contener al menos una minúscula.";
        }
        if (!tieneNumero) {
            return "La contraseña debe contener al menos un número.";
        }
        if (!tieneCaracterEspecial) {
            return "La contraseña debe contener al menos un carácter especial.";
        }
        return null; // Retorna null si la contraseña es válida
    }

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
                    window.location.href = "../html/admin.html";
                } else {
                    window.location.href = "../html/index.html";
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

            // Validar la contraseña.
            const errorContraseña = validarContraseña(password);
            if (errorContraseña) {
                document.getElementById("registerError").textContent = errorContraseña;
                return;
            }

            let role = "user";
            if (username === "admin1" && password === "Admin#123") {
                role = "admin";
            }

            users.push({ fullname, username, password, role });
            localStorage.setItem("users", JSON.stringify(users));
            window.location.href = "../html/login.html";
        });
    }
});