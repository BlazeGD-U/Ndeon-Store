document.addEventListener("DOMContentLoaded", () => {
    const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
    if (!loggedUser || loggedUser.username !== "admin" || loggedUser.password !== "admin") {
        window.location.href = "../html/login.html";
    }

    const productTable = document.querySelector("#productTable tbody");
    const userTable = document.querySelector("#userTable tbody");
    const addProductForm = document.getElementById("addProductForm");
    const logoutButton = document.getElementById("logout");
    let users = JSON.parse(localStorage.getItem("users")) || [];

    function renderProducts() {
        productTable.innerHTML = ""; // Limpiar la tabla antes de volver a llenarla
    
        let products = JSON.parse(localStorage.getItem("products")) || [];
    
        products.forEach((product, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td><img src="${product.imagen}" width="50"></td>
                <td>${product.nombre}</td>
                <td>${product.descripcion}</td>
                <td>${product.precio}</td>
                <td>${product.categoria}</td>
                <td><button class="delete-btn" data-index="${index}">Eliminar</button></td>
            `;
            productTable.appendChild(row);
        });
    
        // ✅ SOLUCIÓN: Agregar eventos a los botones después de renderizar
        document.querySelectorAll(".delete-btn").forEach(button => {
            button.addEventListener("click", function () {
                const index = this.getAttribute("data-index"); // Obtener índice
                deleteProduct(index);
            });
        });
    }
    
    function deleteProduct(index) {
        let products = JSON.parse(localStorage.getItem("products")) || [];
    
        products.splice(index, 1); // Eliminar producto
        localStorage.setItem("products", JSON.stringify(products));
    
        renderProducts();
        window.dispatchEvent(new Event("storage")); // Sincronizar cambios con otras páginas
    }
    
    // Llamar a renderProducts al cargar
    document.addEventListener("DOMContentLoaded", renderProducts);
    

    function renderUsers() {
        userTable.innerHTML = "";
        users.forEach((user, index) => {
            if (user.username !== "admin") {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${user.fullname}</td>
                    <td>${user.username}</td>
                    <td><button onclick="deleteUser(${index})">Eliminar</button></td>
                `;
                userTable.appendChild(row);
            }
        });
    }

    window.deleteUser = function(index) {
        users.splice(index, 1);
        localStorage.setItem("users", JSON.stringify(users));
        renderUsers();
    };

    function addProduct() {
        const nombre = document.getElementById("productName").value;
        const descripcion = document.getElementById("productDescription").value;
        const precio = document.getElementById("productPrice").value;
        const categoria = document.getElementById("productCategory").value;
        const imagen = document.getElementById("productImage").value;
    
        if (!nombre || !descripcion || !precio || !categoria || !imagen) {
            alert("Por favor, complete todos los campos.");
            return;
        }
    
        let products = JSON.parse(localStorage.getItem("products")) || [];
        products.push({ nombre, descripcion, precio, categoria, imagen });

        localStorage.setItem("products", JSON.stringify(products));
    
        renderProducts();
        window.dispatchEvent(new Event("storage")); // Notificar cambios a otras páginas

        alert("Producto agregado correctamente.");
    }

    addProductForm.addEventListener("submit", (e) => {
        e.preventDefault();
        addProduct();
    });

    logoutButton.addEventListener("click", () => {
        localStorage.removeItem("loggedUser");
        window.location.href = "../html/login.html";
    });

    renderProducts();
    renderUsers();
});

