// ===== RECUPERAR PRODUCTOS DEL LOCALSTORAGE =====

let productos = JSON.parse(localStorage.getItem("productos")) || [];


// ===== GUARDAR PRODUCTO =====

const btnGuardar = document.getElementById("btnGuardar");

if (btnGuardar) {

    btnGuardar.addEventListener("click", function () {

        const id = document.getElementById("idProducto").value.trim();
        const nombre = document.getElementById("nombreProducto").value.trim();
        const precio = document.getElementById("precioProducto").value.trim();
        const stock = document.getElementById("stockProducto").value.trim();

        // Validar que no hayan campos vacíos
        if (id === "" || nombre === "" || precio === "" || stock === "") {
            alert("Por favor complete todos los campos");
            return;
        }

        // Validar que precio y stock no sean negativos
        if (Number(precio) < 0 || Number(stock) < 0) {
            alert("El precio y el stock no pueden ser negativos");
            return;
        }

        // Validar que el ID no esté repetido
        const existe = productos.some(producto => producto.id === id);

        if (existe) {
            alert("Ya existe un producto con ese ID");
            return;
        }

        const producto = {
            id: id,
            nombre: nombre,
            precio: precio,
            stock: stock
        };

        productos.push(producto);

        localStorage.setItem("productos", JSON.stringify(productos));

        alert("Producto guardado correctamente");

        // Limpiar formulario
        document.getElementById("idProducto").value = "";
        document.getElementById("nombreProducto").value = "";
        document.getElementById("precioProducto").value = "";
        document.getElementById("stockProducto").value = "";
    });
}


// ===== MOSTRAR PRODUCTOS =====

const listaProductos = document.getElementById("listaProductos");

function mostrarProductos() {

    if (!listaProductos) {
        return;
    }

    listaProductos.innerHTML = "";

    productos.forEach((producto, indice) => {

        const fila = document.createElement("tr");

        fila.innerHTML = `
            <td>${producto.id}</td>
            <td>${producto.nombre}</td>
            <td>$${producto.precio}</td>
            <td>${producto.stock}</td>
            <td>
                <button onclick="editarProducto(${indice})">
                    Editar
                </button>

                <button onclick="eliminarProducto(${indice})">
                    Eliminar
                </button>
            </td>
        `;

        listaProductos.appendChild(fila);
    });
}
// ===== BUSCAR / FILTRAR PRODUCTOS =====

const buscarProducto = document.getElementById("buscarProducto");

if (buscarProducto) {

    buscarProducto.addEventListener("input", function () {

        const texto = buscarProducto.value.toLowerCase().trim();

        listaProductos.innerHTML = "";

        const productosFiltrados = productos.filter(producto => {

            return (
                String(producto.id).toLowerCase().includes(texto) ||
                producto.nombre.toLowerCase().includes(texto)
            );
        });

        productosFiltrados.forEach((producto) => {

            // Buscar el índice real dentro del arreglo original
            const indiceReal = productos.indexOf(producto);

            const fila = document.createElement("tr");

            fila.innerHTML = `
                <td>${producto.id}</td>
                <td>${producto.nombre}</td>
                <td>$${producto.precio}</td>
                <td>${producto.stock}</td>
                <td>
                    <button onclick="editarProducto(${indiceReal})">
                        Editar
                    </button>

                    <button onclick="eliminarProducto(${indiceReal})">
                        Eliminar
                    </button>
                </td>
            `;

            listaProductos.appendChild(fila);
        });
    });
}

// ===== ELIMINAR PRODUCTO =====

function eliminarProducto(indice) {

    const confirmar = confirm(
        "¿Está seguro de que desea eliminar este producto?"
    );

    if (confirmar) {

        productos.splice(indice, 1);

        localStorage.setItem(
            "productos",
            JSON.stringify(productos)
        );

        mostrarProductos();
    }
}


// ===== EDITAR PRODUCTO =====

function editarProducto(indice) {

    const producto = productos[indice];

    const nuevoNombre = prompt(
        "Nombre del producto:",
        producto.nombre
    );

    if (nuevoNombre === null) {
        return;
    }

    const nuevoPrecio = prompt(
        "Precio del producto:",
        producto.precio
    );

    if (nuevoPrecio === null) {
        return;
    }

    const nuevoStock = prompt(
        "Stock del producto:",
        producto.stock
    );

    if (nuevoStock === null) {
        return;
    }
    // Validar que los campos no queden vacíos
    if (
        nuevoNombre.trim() === "" ||
        nuevoPrecio.trim() === "" ||
        nuevoStock.trim() === ""
    ) {
        alert("Los campos no pueden quedar vacíos");
        return;
    }

    // Validar que precio y stock no sean negativos
    if (
        Number(nuevoPrecio) < 0 ||
        Number(nuevoStock) < 0
    ) {
        alert("El precio y el stock no pueden ser negativos");
        return;
    }

    producto.nombre = nuevoNombre.trim();
    producto.precio = nuevoPrecio.trim();
    producto.stock = nuevoStock.trim();

    localStorage.setItem(
        "productos",
        JSON.stringify(productos)
    );

    mostrarProductos();

    alert("Producto actualizado correctamente");
}


// ===== CARGAR PRODUCTOS AL ABRIR LA PÁGINA =====

mostrarProductos();