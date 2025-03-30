document.addEventListener("DOMContentLoaded", mostrarCarrito);

function obtenerCarrito() {
    return JSON.parse(localStorage.getItem("carrito")) || [];
}

function guardarCarrito(carrito) {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function mostrarCarrito() {
    const cartItems = document.getElementById("cart-items");
    const totalSpan = document.getElementById("total");
    let carrito = obtenerCarrito();
    cartItems.innerHTML = "";
    let total = 0;

    if (carrito.length === 0) {
        cartItems.innerHTML = "<tr><td colspan='5'>El carrito está vacío.</td></tr>";
        totalSpan.textContent = "0.00";
        return;
    }

    carrito.forEach((producto, index) => {
        let precioNumerico = parseFloat(producto.precio); // Convertir precio a número
        let totalProducto = precioNumerico * producto.cantidad;
        total += totalProducto;

        let fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${producto.nombre}</td>
            <td>${producto.cantidad}</td>
            <td>$${precioNumerico.toFixed(2)}</td>
            <td>$${totalProducto.toFixed(2)}</td>
            <td>
                <button onclick="restarCantidad(${index})">➖</button>
                <button onclick="eliminarProducto(${index})">❌</button>
            </td>
        `;
        cartItems.appendChild(fila);
    });

    totalSpan.textContent = total.toFixed(2);
}


function restarCantidad(index) {
    let carrito = obtenerCarrito();
    if (carrito[index].cantidad > 1) {
        carrito[index].cantidad--;
    } else {
        carrito.splice(index, 1);
    }
    guardarCarrito(carrito);
    mostrarCarrito();
}

function eliminarProducto(index) {
    let carrito = obtenerCarrito();
    carrito.splice(index, 1);
    guardarCarrito(carrito);
    mostrarCarrito();
}

// Simulación de pago
document.getElementById("pagarBtn").addEventListener("click", () => {
    alert("Compra realizada con éxito. ¡Gracias!");
    localStorage.removeItem("carrito");
    window.location.href = "index.html";
});
