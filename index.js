
// variables
const form = document.querySelector("#formProducto");
const inputProducto = document.querySelector('#Producto')
const inputPrecio = document.querySelector('#Precio')
const listaProductos = document.getElementById("lista-productos");
let productos = [];
const jsonAlmacenados = localStorage.getItem('productos')



// Crear producto en inventario
class Producto {
    constructor(nombre, precio){
        this.nombre = nombre
        this.precio = precio
    }
}

function refrescar() {
    listaProductos.innerHTML = ''; 

    productos.forEach(p => {
        const liProducto = agregarProductoALista(p); 
        listaProductos.appendChild(liProducto);
    });
}

function eliminarProducto(producto) {
    const indice = productos.indexOf(producto);
    if (indice !== -1) {
        productos.splice(indice, 1);
        localStorage.setItem('productos', JSON.stringify(productos));
        refrescar();
    }
}


// almacenamiento de datos

if (jsonAlmacenados){
    productos = JSON.parse(jsonAlmacenados)
    refrescar()
}

form.addEventListener("submit", e => {
    e.preventDefault()


    if (!isNaN(inputPrecio.value) && inputProducto.value) {
        const prod = new Producto(inputProducto.value, inputPrecio.value);
        productos.push(prod);
        localStorage.setItem('productos', JSON.stringify(productos))
        agregarProductoALista(prod);
        inputProducto.value = "";
        inputPrecio.value = "";

        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Tu producto se agrego correctamente!',
            showConfirmButton: false,
            timer: 1500
        })

    } else {
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: "Por favor, ingresa un producto y un precio válido.",
            showConfirmButton: false,
            timer: 1500
        })
    
    }
    refrescar()
});

// agregar producto en catalogo

function agregarProductoALista(producto) {
    const li = document.createElement("li");
    li.classList.add("producto-item");

    const nombreSpan = document.createElement("span");
    nombreSpan.textContent = producto.nombre;
    nombreSpan.classList.add("nombre-producto");

    const precioSpan = document.createElement("span");
    precioSpan.textContent = `$${producto.precio}`;
    precioSpan.classList.add("precio-producto");

    const botonEliminar = document.createElement("button");
    botonEliminar.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
    </svg>
    `;
    botonEliminar.classList.add("boton-eliminar");
    botonEliminar.addEventListener("click", () => {
        eliminarProducto(producto); 
    });

    li.appendChild(nombreSpan);
    li.appendChild(precioSpan);
    li.appendChild(botonEliminar); 

    return li;
    refrescar()
}
















