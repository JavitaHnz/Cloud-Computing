import { db } from "./firebase.js";

import {
    doc,
    setDoc,
    getDoc
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

            // Crear referencia al documento
            // Colección: productos
            // Documento: el ID ingresado

            const referenciaProducto = doc(
                db,
                "productos",
                id
            );


            // ===== COMPROBAR SI EXISTE =====

            const productoExistente =
                await getDoc(referenciaProducto);


            if (productoExistente.exists()) {

                alert(
                    "Ya existe un producto con ese ID en Firebase"
                );

                return;
            }


            // ===== GUARDAR EN FIRESTORE =====

            await setDoc(referenciaProducto, {

                id: id,

                nombre: nombre,

                precio: Number(precio),

                stock: Number(stock)

            });


            alert(
                "Producto guardado correctamente en Firebase"
            );


            // ===== LIMPIAR FORMULARIO =====

            document.getElementById(
                "idProducto"
            ).value = "";

            document.getElementById(
                "nombreProducto"
            ).value = "";

            document.getElementById(
                "precioProducto"
            ).value = "";

            document.getElementById(
                "stockProducto"
            ).value = "";


        } catch (error) {

            console.error(
                "Error al guardar en Firebase:",
                error
            );

            alert(
                "No se pudo guardar el producto en Firebase"
            );

        }

    });

}