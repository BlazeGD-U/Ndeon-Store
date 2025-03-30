document.addEventListener("DOMContentLoaded", cargarProductos);
window.addEventListener("storage", cargarProductos); // Actualizar en tiempo real si cambian los productos

function cargarProductos() {
    let productos = JSON.parse(localStorage.getItem("products")) || [];
    const productosLista = document.querySelector(".productos-container");
    productosLista.innerHTML = ""; // Limpiar antes de agregar nuevos productos

    productos.forEach((producto) => {
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <p>${producto.nombre}</p>
        `;
        div.addEventListener("click", () => abrirModal(producto));
        productosLista.appendChild(div);
    });
}

const modal = document.querySelector("#modal");
const modalNombre = document.querySelector("#modalNombre");
const modalImagen = document.querySelector("#modalImagen");
const modalDescripcion = document.querySelector("#modalDescripcion");
const modalPrecio = document.querySelector("#modalPrecio");
const modalCategoria = document.querySelector("#modalCategoria");
const modalCantidad = document.querySelector("#modalCantidad");
const agregarCarritoBtn = document.querySelector("#agregarCarritoBtn");
const cerrarModalBtn = document.querySelector("#cerrarModal");

function abrirModal(producto) {
    modal.style.display = "flex";
    modalNombre.textContent = producto.nombre;
    modalImagen.src = producto.imagen;
    modalDescripcion.textContent = producto.descripcion;
    modalPrecio.textContent = producto.precio;
    modalCategoria.textContent = producto.categoria;
    modalCantidad.value = 1;

    agregarCarritoBtn.onclick = () => agregarAlCarrito(producto, modalCantidad.value);
}

cerrarModalBtn.addEventListener("click", () => {
    modal.style.display = "none";
});

function agregarAlCarrito(producto, cantidad) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    cantidad = parseInt(cantidad);

    let productoExistente = carrito.find(item => item.nombre === producto.nombre);

    if (productoExistente) {
        productoExistente.cantidad += cantidad;
    } else {
        carrito.push({
            nombre: producto.nombre,
            imagen: producto.imagen,
            descripcion: producto.descripcion,
            precio: parseFloat(producto.precio.replace("$", "")),
            categoria: producto.categoria,
            cantidad: cantidad
        });
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    alert("Producto agregado al carrito correctamente.");
}
