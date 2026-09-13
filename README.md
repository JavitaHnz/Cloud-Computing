# ☁️ Cloud Computing - Sistema de Gestión de Productos

Proyecto desarrollado para la asignatura **Computación en la Nube** del Instituto Profesional Santo Tomás.

El objetivo del proyecto es demostrar la diferencia entre almacenar información de forma local utilizando **LocalStorage** y almacenar información en la nube utilizando **Firebase Firestore**.

---

## 🌐 Sitio publicado

El proyecto se encuentra publicado mediante GitHub Pages:

https://javitahnz.github.io/Cloud-Computing/

---

## 📋 Descripción del proyecto

El sistema permite administrar productos mediante dos métodos de almacenamiento:

### 💾 LocalStorage

Los productos se almacenan directamente en el navegador del usuario.

Permite:

- Registrar productos.
- Visualizar productos.
- Buscar productos por ID o nombre.
- Editar productos.
- Eliminar productos.
- Controlar precio y stock.

Los datos solamente están disponibles en el navegador donde fueron registrados.

### ☁️ Firebase Firestore

Los productos se almacenan en una base de datos Firestore en la nube.

Permite:

- Registrar productos.
- Visualizar productos almacenados en la nube.
- Buscar productos por ID o nombre.
- Editar productos.
- Eliminar productos.
- Compartir los datos entre diferentes dispositivos.

Los datos permanecen almacenados en Firebase y pueden ser consultados desde otros dispositivos con acceso a la aplicación.

---

## 🛠️ Tecnologías utilizadas

- HTML5
- CSS3
- JavaScript
- LocalStorage
- Firebase
- Cloud Firestore
- Firebase Authentication
- Git
- GitHub
- GitHub Pages

---

## 📦 Modelo de datos

Cada producto utiliza la siguiente estructura:

| Campo | Tipo | Descripción |
|---|---|---|
| id | String | Identificador único del producto |
| nombre | String | Nombre del producto |
| precio | Number | Precio del producto |
| stock | Number | Cantidad disponible |

El ID se utiliza como identificador estable del producto y no se modifica durante la actualización.

El precio y el stock no pueden contener valores negativos.

---

## 🔄 CRUD

El proyecto implementa las cuatro operaciones principales de un CRUD:

### Create
Permite registrar nuevos productos.

### Read
Permite visualizar los productos almacenados.

### Update
Permite modificar el nombre, precio y stock de un producto existente.

### Delete
Permite eliminar productos previa confirmación del usuario.

Estas operaciones se encuentran implementadas tanto para LocalStorage como para Firebase Firestore.

---

## 🔍 Filtro de productos

El sistema incorpora un buscador que permite filtrar productos mediante:

- ID del producto.
- Nombre del producto.

El filtro funciona tanto en la versión LocalStorage como en la versión Firebase.

---

## ✅ Validaciones

El sistema incluye validaciones para evitar datos incorrectos.

Entre ellas:

- Campos obligatorios.
- Control de ID repetido.
- Precio no negativo.
- Stock no negativo.
- Validación durante la edición.
- Confirmación antes de eliminar un producto.
- Mensajes de error cuando una operación no puede realizarse.

En Firebase también se controlan los problemas de conexión a Internet para informar al usuario cuando no es posible comunicarse con el servicio.

---

## ☁️ Funcionamiento Cloud

### Hosting

La aplicación web está publicada utilizando **GitHub Pages**.

GitHub Pages permite que los archivos HTML, CSS y JavaScript del proyecto puedan ser accedidos desde Internet mediante una URL pública.

### Datos

Los datos de la versión Cloud son almacenados utilizando **Cloud Firestore**, servicio de base de datos de Firebase.

### Flujo de información

El flujo principal de Firebase es:

**Usuario → Página web → JavaScript → Firebase / Firestore → Base de datos en la nube → Respuesta → Usuario**

Cuando el usuario registra un producto, JavaScript envía la información a Firestore. Firebase procesa la solicitud y almacena el producto en la nube.

Cuando se consultan los productos, la aplicación solicita la información a Firestore y posteriormente la muestra en la tabla.

---

## 💾 LocalStorage vs ☁️ Firebase

### LocalStorage

El flujo es:

**Usuario → Navegador → LocalStorage → Navegador → Usuario**

Los datos quedan almacenados solamente en el navegador utilizado.

Si se utiliza otro computador o navegador, esos datos no estarán disponibles.

### Firebase

El flujo es:

**Usuario → Internet → Firebase → Firestore → Internet → Usuario**

Los datos se almacenan en la nube y pueden ser consultados desde diferentes dispositivos.

Esta es la principal diferencia entre el almacenamiento local y el almacenamiento Cloud utilizado en el proyecto.

---

## 🔐 Seguridad

El proyecto utiliza **Firebase Authentication con autenticación anónima**.

Cuando una persona utiliza las funciones Firebase, se establece una sesión anónima mediante Firebase Authentication.

Las reglas de Firestore restringen las operaciones sobre la colección `productos` a usuarios autenticados.

Además, las reglas validan la estructura de los productos y controlan que el precio y el stock no sean negativos.

Las reglas utilizadas son:

```javascript
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {

    match /productos/{productoId} {

      allow read: if request.auth != null;

      allow create: if request.auth != null
                    && request.resource.data.keys().hasAll([
                      'id',
                      'nombre',
                      'precio',
                      'stock'
                    ])
                    && request.resource.data.id is string
                    && request.resource.data.nombre is string
                    && request.resource.data.precio is number
                    && request.resource.data.stock is number
                    && request.resource.data.precio >= 0
                    && request.resource.data.stock >= 0;

      allow update: if request.auth != null
                    && request.resource.data.id == resource.data.id
                    && request.resource.data.nombre is string
                    && request.resource.data.precio is number
                    && request.resource.data.stock is number
                    && request.resource.data.precio >= 0
                    && request.resource.data.stock >= 0;

      allow delete: if request.auth != null;
    }
  }
}
```

La configuración pública utilizada por el SDK web de Firebase permite conectar la aplicación con el proyecto, mientras que el control de acceso a los datos se realiza mediante Firebase Authentication y las reglas de Firestore.

---

## 🌐 Manejo de errores de red

Las operaciones realizadas contra Firebase utilizan manejo de errores mediante `try/catch`.

Si el navegador pierde la conexión a Internet, el sistema informa al usuario que la operación no pudo completarse debido a un problema de conexión.

Esto se aplica a:

- Registro de productos.
- Carga de productos.
- Edición.
- Eliminación.

---

## 📁 Estructura del proyecto

```text
Cloud-Computing/
│
├── index.html
├── README.md
│
├── css/
│   └── style.css
│
├── html/
│   ├── informacion.html
│   ├── productos.html
│   ├── registroFirebase.html
│   └── productosFirebase.html
│
├── js/
│   ├── firebase.js
│   ├── productos.js
│   └── productosFirebase.js
│
└── img/
    └── logo-IP-Santo-tomas.webp
```

---

## ▶️ Ejecución del proyecto

### Versión publicada

Ingresar a:

https://javitahnz.github.io/Cloud-Computing/

Desde la página principal se puede seleccionar:

- LocalStorage
- Firebase

### Ejecución local

1. Clonar el repositorio.
2. Abrir la carpeta del proyecto.
3. Abrir `index.html` mediante un servidor local, por ejemplo Live Server.
4. Seleccionar LocalStorage o Firebase desde el menú principal.

---

## 🧪 Pruebas realizadas

### LocalStorage

- Registrar producto.
- Mostrar producto.
- Buscar por ID.
- Buscar por nombre.
- Editar producto.
- Eliminar producto.
- Intentar registrar campos vacíos.
- Intentar utilizar precio negativo.
- Intentar utilizar stock negativo.
- Intentar registrar un ID repetido.

### Firebase

- Registrar producto en Firestore.
- Mostrar productos almacenados.
- Buscar por ID.
- Buscar por nombre.
- Editar producto.
- Eliminar producto.
- Validar ID repetido.
- Validar precio y stock.
- Comprobar manejo de errores de conexión.
- Comprobar autenticación anónima.
- Comprobar funcionamiento con reglas de seguridad de Firestore.

---

## 📚 Conceptos demostrados

Este proyecto permite demostrar los siguientes conceptos:

- Almacenamiento local.
- Almacenamiento Cloud.
- CRUD.
- Persistencia de datos.
- Base de datos Firestore.
- Autenticación.
- Reglas de seguridad.
- Hosting web.
- Git y control de versiones.
- Publicación mediante GitHub Pages.

---

## 🎓 Asignatura

**Computación en la Nube**

Instituto Profesional Santo Tomás

**Estudiante:** Javiera Almonacid