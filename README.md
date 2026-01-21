# Aventura Tour 🌍✈️

Proyecto final de **JavaScript Avanzado**, consistente en el desarrollo de un sitio web de una agencia de viajes ficticia llamada **Aventura Tour**.

El objetivo del proyecto es aplicar HTML5, CSS3 y JavaScript para crear una web dinámica, estructurada y optimizada, siguiendo buenas prácticas de desarrollo web.

---

## 📖 Descripción del proyecto

Aventura Tour es una web orientada al turismo de aventura que permite al usuario:

- Informarse sobre la empresa y sus valores
- Consultar noticias cargadas dinámicamente desde un archivo externo
- Explorar una galería de destinos organizada por continentes y categorías
- Solicitar un presupuesto personalizado mediante un formulario dinámico
- Consultar los datos de contacto y la ubicación de la empresa mediante un mapa interactivo

---

## 🛠️ Tecnologías utilizadas

- **HTML5** – Estructura semántica de la web
- **CSS3** – Diseño, maquetación responsive y estilos modernos
- **JavaScript (ES6)** – Lógica, validaciones y contenido dinámico
- **AJAX / Fetch API** – Carga de datos desde archivos JSON
- **JSON** – Almacenamiento de datos externos (galería, noticias)
- **Leaflet + OpenStreetMap** – Mapa dinámico en la página de contacto

---

## 📂 Estructura del proyecto

aventura-tour/
│
├── index.html
├── views/
│ ├── galeria.html
│ ├── contacto.html
│ └── presupuesto.html
│
├── css/
│ ├── styles.css
│ └── galeria.css
│
├── js/
│ ├── galeria.js
│ ├── contacto.js
│ └── presupuesto.js
│
├── assets/
│ ├── json/
│ │ └── galeria.json
│ │
│ └── images/
│ ├── favicon.ico
│ ├── logo.png
│ └── galeria/
│ ├── capitales/
│ ├── europa/
│ ├── asia/
│ ├── africa/
│ ├── america/
│ └── oceania/
│
└── README.md


---

## ⚙️ Funcionalidades principales

### 🏠 Página de inicio
- Diseño tipo hero
- Varias secciones informativas
- Noticias cargadas dinámicamente desde un archivo externo (JSON)

### 🖼️ Galería
- Galería dinámica generada mediante JavaScript
- Organización por continentes y categorías
- Datos cargados desde un archivo JSON
- Contenido escalable sin modificar el HTML

### 🧾 Presupuesto
- Formulario dividido en dos partes:
  - Datos personales con validación en JavaScript
  - Cálculo dinámico del presupuesto según producto, plazo y extras
- Actualización automática del precio sin recargar la página

### 📍 Contacto
- Mapa interactivo con OpenStreetMap
- Posibilidad de introducir manualmente la dirección del cliente
- Cálculo de ruta hasta la ubicación de la empresa

---

## ▶️ Cómo ejecutar el proyecto

1. Descargar o clonar el repositorio
2. Abrir el proyecto en un servidor local (recomendado):
   - Visual Studio Code + Live Server  
3. Abrir `index.html` desde el navegador

> Nota: para el correcto funcionamiento de la carga de archivos JSON es necesario utilizar un servidor local.

---

## 🚀 Optimización y buenas prácticas

- Imágenes optimizadas en formato JPG y resolución adaptada a su visualización
- Código HTML validado según estándares W3C
- Separación clara entre estructura, estilos y lógica
- Uso de nombres semánticos y estructura escalable

---

## 👩‍💻 Autora

**Beatriz Cano**  
Proyecto académico – JavaScript Avanzado
