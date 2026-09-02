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

    producto.nombre = nuevoNombre;
    producto.precio = nuevoPrecio;
    producto.stock = nuevoStock;

    localStorage.setItem(
        "productos",
        JSON.stringify(productos)
    );

    mostrarProductos();

    alert("Producto actualizado correctamente");
}


// ===== CARGAR PRODUCTOS AL ABRIR LA PÁGINA =====

mostrarProductos();