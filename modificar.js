
function calcularPorcentaje (precioAntiguo, nuevoPrecio){
    const cantAumento = (nuevoPrecio - precioAntiguo) / precioAntiguo * 100
    return cantAumento
}

const formModificarPrecio = document.querySelector("#formModificarPrecio");

formModificarPrecio.addEventListener("submit", e => {
    e.preventDefault();
    console.log("Formulario enviado");

    const nombreProducto = document.querySelector('#ProductoModificar').value;
    const nuevoPrecio = document.querySelector('#nuevoPrecio').value;

    if (!isNaN(nuevoPrecio) && nombreProducto) {
        const productoPorNombre = productos.find(producto => producto.nombre === nombreProducto);
        if (productoPorNombre) {
            const precioAntiguo = productoPorNombre.precio;
            const resultado = calcularPorcentaje(precioAntiguo, nuevoPrecio);
            productoPorNombre.precio = nuevoPrecio;
            
            localStorage.setItem('productos', JSON.stringify(productos));

            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Precio actualizado con éxito.\nEl aumento es de ' + resultado + '%',
                showConfirmButton: false,
                timer: 1500
            })
            
            document.querySelector("#ProductoModificar").value = "";
            document.querySelector("#nuevoPrecio").value = "";

            refrescar();           
        } else {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: "No se encontró ningún producto con el nombre indicado.",
                showConfirmButton: false,
                timer: 1500
            })
        }
    } else {
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: "Por favor, ingresa un nombre de producto y un precio válido.",
            showConfirmButton: false,
            timer: 1500
        })
    }
});

