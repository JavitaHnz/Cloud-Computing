// ===== IMPORTAR FIREBASE =====

import { initializeApp } from
"https://www.gstatic.com/firebasejs/12.18.0/firebase-app.js";

import { getFirestore } from
"https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js";


// ===== CONFIGURACIÓN DE FIREBASE =====

const firebaseConfig = {
    apiKey: "AIzaSyBLhmf33qmHSGbOTA98woEsxfTRmRwn034",
    authDomain: "cloud-computing-770d0.firebaseapp.com",
    projectId: "cloud-computing-770d0",
    storageBucket: "cloud-computing-770d0.firebasestorage.app",
    messagingSenderId: "290534814286",
    appId: "1:290534814286:web:b7442359696bd9364b491f",
    measurementId: "G-E78DQCZQWT"
};


// ===== INICIALIZAR FIREBASE =====

const app = initializeApp(firebaseConfig);


// ===== INICIALIZAR FIRESTORE =====

const db = getFirestore(app);


// ===== EXPORTAR BASE DE DATOS =====

export { db };