
function calcularPorcentaje (precioAntiguo, nuevoPrecio){
    const cantAumento = (nuevoPrecio - precioAntiguo) / precioAntiguo * 100
    return cantAumento
}

const formModificarPrecio = document.querySelector("#formModificarPrecio");

formModificarPrecio.addEventListener("submit", e => {
    e.preventDefault();

    const nombreProducto = document.querySelector('#Producto').value;
    const nuevoPrecio = document.querySelector('#nuevoPrecio').value;

    if (!isNaN(nuevoPrecio) && nombreProducto) {
        const productoPorNombre = productos.find(producto => producto.nombre === nombreProducto);
        if (productoPorNombre) {
            const precioAntiguo = productoPorNombre.precio;
            const resultado = calcularPorcentaje(precioAntiguo, nuevoPrecio);
            productoPorNombre.precio = nuevoPrecio;

            alert('Precio actualizado con éxito.\nEl aumento es de ' + resultado + '%');
        } else {
            alert("No se encontró ningún producto con el nombre indicado.");
        }
    } else {
        alert("Por favor, ingresa un nombre de producto y un precio válido.");
    }

    
});
                     