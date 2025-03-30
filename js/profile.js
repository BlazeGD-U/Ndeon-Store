document.addEventListener("DOMContentLoaded", () => {
    const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const errorMessage = document.getElementById("errorMessage");

    if (!loggedUser) {
        window.location.href = "../html/login.html";
        return;
    }

    document.getElementById("fullname").textContent = loggedUser.fullname;
    document.getElementById("username").textContent = loggedUser.username;

    document.getElementById("showPassword").addEventListener("click", () => {
        const verifyPassword = document.getElementById("verifyPassword").value;
        if (verifyPassword === loggedUser.password) {
            document.getElementById("passwordDisplay").textContent = loggedUser.password;
        } else {
            errorMessage.textContent = "Contraseña incorrecta.";
        }
    });

    document.getElementById("editProfileForm").addEventListener("submit", (e) => {
        e.preventDefault();
        const newUsername = document.getElementById("newUsername").value;
        const currentPassword = document.getElementById("currentPassword").value;
        const newPassword = document.getElementById("newPassword").value;

        if (currentPassword !== loggedUser.password) {
            errorMessage.textContent = "Contraseña actual incorrecta.";
            return;
        }

        let updatedUser = { ...loggedUser };
        if (newUsername) updatedUser.username = newUsername;
        if (newPassword) updatedUser.password = newPassword;

        const updatedUsers = users.map(user => user.username === loggedUser.username ? updatedUser : user);
        localStorage.setItem("users", JSON.stringify(updatedUsers));
        localStorage.setItem("loggedUser", JSON.stringify(updatedUser));
        
        alert("Perfil actualizado correctamente.");
        window.location.reload();
    });

    document.getElementById("logout").addEventListener("click", () => {
        localStorage.removeItem("loggedUser");
        window.location.href = "../html/login.html";
    });
});




