import { db } from "./firebase.js";

import {
    doc,
    setDoc,
    getDoc,
    getDocs,
    collection,
    updateDoc,
    deleteDoc
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js";


// ===== BOTÓN GUARDAR FIREBASE =====

const btnGuardarFirebase = document.getElementById("btnGuardarFirebase");


if (btnGuardarFirebase) {

    btnGuardarFirebase.addEventListener("click", async function () {

        const id = document.getElementById("idProducto").value.trim();
        const nombre = document.getElementById("nombreProducto").value.trim();
        const precio = document.getElementById("precioProducto").value.trim();
        const stock = document.getElementById("stockProducto").value.trim();


        // ===== VALIDAR CAMPOS =====

        if (
            id === "" ||
            nombre === "" ||
            precio === "" ||
            stock === ""
        ) {

            alert("Por favor complete todos los campos");
            return;
        }


        // ===== VALIDAR NÚMEROS =====

        if (Number(precio) < 0 || Number(stock) < 0) {

            alert("El precio y el stock no pueden ser negativos");
            return;
        }


        try {

            const referenciaProducto = doc(
                db,
                "productos",
                id
            );


            // ===== COMPROBAR SI EXISTE =====

            const productoExistente =
                await getDoc(referenciaProducto);


            if (productoExistente.exists()) {

                alert("Ya existe un producto con ese ID en Firebase");
                return;
            }


            // ===== GUARDAR EN FIRESTORE =====

            await setDoc(referenciaProducto, {

                id: id,
                nombre: nombre,
                precio: Number(precio),
                stock: Number(stock)

            });


            alert("Producto guardado correctamente en Firebase");


            // ===== LIMPIAR FORMULARIO =====

            document.getElementById("idProducto").value = "";
            document.getElementById("nombreProducto").value = "";
            document.getElementById("precioProducto").value = "";
            document.getElementById("stockProducto").value = "";


        } catch (error) {

            console.error("Error al guardar en Firebase:", error);

            alert("No se pudo guardar el producto en Firebase");

        }

    });

}


// ======================================================
// ===== MOSTRAR PRODUCTOS GUARDADOS EN FIREBASE ========
// ======================================================

const listaProductosFirebase =
    document.getElementById("listaProductosFirebase");


async function mostrarProductosFirebase() {

    if (!listaProductosFirebase) {
        return;
    }

    listaProductosFirebase.innerHTML = "";


    try {

        const consulta = await getDocs(
            collection(db, "productos")
        );


        consulta.forEach((documento) => {

            const producto = documento.data();


            const fila = document.createElement("tr");


            fila.innerHTML = `
                <td>${producto.id}</td>
                <td>${producto.nombre}</td>
                <td>$${producto.precio}</td>
                <td>${producto.stock}</td>

                <td>
                    <button
                        class="btn-editar"
                        data-id="${producto.id}">
                        Editar
                    </button>

                    <button
                        class="btn-eliminar"
                        data-id="${producto.id}">
                        Eliminar
                    </button>
                </td>
            `;


            listaProductosFirebase.appendChild(fila);

        });


        // ===== BOTONES EDITAR =====

        document
            .querySelectorAll(".btn-editar")
            .forEach((boton) => {

                boton.addEventListener("click", function () {

                    editarProductoFirebase(
                        this.dataset.id
                    );

                });

            });


        // ===== BOTONES ELIMINAR =====

        document
            .querySelectorAll(".btn-eliminar")
            .forEach((boton) => {

                boton.addEventListener("click", function () {

                    eliminarProductoFirebase(
                        this.dataset.id
                    );

                });

            });


    } catch (error) {

        console.error(
            "Error al mostrar productos:",
            error
        );

        alert(
            "No se pudieron cargar los productos"
        );

    }

}


// ======================================================
// ===== EDITAR PRODUCTO ================================
// ======================================================

async function editarProductoFirebase(id) {

    try {

        const referenciaProducto =
            doc(db, "productos", id);


        const productoGuardado =
            await getDoc(referenciaProducto);


        if (!productoGuardado.exists()) {

            alert("El producto no existe");
            return;

        }


        const producto =
            productoGuardado.data();


        const nuevoNombre =
            prompt(
                "Nombre del producto:",
                producto.nombre
            );


        if (nuevoNombre === null) {
            return;
        }


        const nuevoPrecio =
            prompt(
                "Precio del producto:",
                producto.precio
            );


        if (nuevoPrecio === null) {
            return;
        }


        const nuevoStock =
            prompt(
                "Stock del producto:",
                producto.stock
            );


        if (nuevoStock === null) {
            return;
        }


        if (
            nuevoNombre.trim() === "" ||
            nuevoPrecio.trim() === "" ||
            nuevoStock.trim() === ""
        ) {

            alert("Los campos no pueden quedar vacíos");
            return;

        }


        if (
            Number(nuevoPrecio) < 0 ||
            Number(nuevoStock) < 0
        ) {

            alert(
                "El precio y el stock no pueden ser negativos"
            );

            return;
        }


        await updateDoc(
            referenciaProducto,
            {
                nombre: nuevoNombre.trim(),
                precio: Number(nuevoPrecio),
                stock: Number(nuevoStock)
            }
        );


        alert(
            "Producto actualizado correctamente"
        );


        mostrarProductosFirebase();


    } catch (error) {

        console.error(
            "Error al editar producto:",
            error
        );

        alert(
            "No se pudo editar el producto"
        );

    }

}


// ======================================================
// ===== ELIMINAR PRODUCTO ==============================
// ======================================================

async function eliminarProductoFirebase(id) {

    const confirmar = confirm(
        "¿Está seguro de que desea eliminar este producto?"
    );


    if (!confirmar) {
        return;
    }


    try {

        await deleteDoc(
            doc(db, "productos", id)
        );


        alert(
            "Producto eliminado correctamente"
        );


        mostrarProductosFirebase();


    } catch (error) {

        console.error(
            "Error al eliminar producto:",
            error
        );

        alert(
            "No se pudo eliminar el producto"
        );

    }

}


// ===== CARGAR PRODUCTOS AL ABRIR LA PÁGINA =====

mostrarProductosFirebase();