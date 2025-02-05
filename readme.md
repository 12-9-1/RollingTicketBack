# Tiquetazo

## Descripción del Proyecto
**Tiquetazo** es una aplicación web diseñada para facilitar la compra de boletos de avión. Ofrece una interfaz intuitiva y funcionalidades útiles que garantizan una experiencia de usuario amigable y eficiente.

### Objetivo
Facilitar la compra de boletos en línea, brindando una experiencia de usuario fluida y efectiva.

## Equipo

### Líderes de Proyecto
- **Team Leader**: Camila Prado
- **Front-end Lead**: Lia Costilla
- **Back-end Lead**: Diego Pizarro

### Integrantes
- Camila Prado  
- Lia Costilla  
- Diego Pizarro  
- Johana Ale  
- Mariano Godoy  
- Ramiro Sorroza  
- Valentino Lencina  
- Jeremias Pedraza  

### Contacto
| Nombre            | GitHub                                         | Gmail                                |
|-------------------|-----------------------------------------------|--------------------------------------|
| Camila Prado      | [camiiprd](https://github.com/camiiprd)      | camila.prado.031@gmail.com          |
| Lia Costilla      | [12-9-1](https://github.com/12-9-1)          | lisbetcostilla@gmail.com            |
| Diego Pizarro     | [diegoandrespizarro](https://github.com/diegoandrespizarro) | diego.pizarro1986@gmail.com        |
| Johana Ale        | [JohanaAle](https://github.com/JohanaAle)    | Johanaale75@gmail.com               |
| Mariano Godoy     | [Mariano-Godoy](https://github.com/Mariano-Godoy) | @mariano-godoy                     |
| Ramiro Sorroza    | [RamiSorroza](https://github.com/RamiSorroza) | ramirosorroza@gmail.com            |
| Valentino Lencina  | [ValeLenci](https://github.com/ValeLenci)    | valentinolencina77@gmail.com       |
| Jeremias Pedraza  | [jpedraza-1](https://github.com/jpedraza-1)  | Recaldetvrc@gmail.com               |

## Tecnologías Utilizadas

### Frontend
- **React**: Biblioteca de JavaScript para construir interfaces de usuario.
- **Vite**: Herramienta de construcción que proporciona un entorno de desarrollo rápido.
- **Bootstrap**: Framework CSS para un diseño responsivo y estilización rápida.
- **Axios**: Cliente HTTP para realizar solicitudes a APIs.
- **React Router DOM**: Biblioteca para manejar la navegación en aplicaciones de React.
- **SweetAlert**: Librería para crear alertas personalizadas.
- **Font Awesome**: Conjunto de iconos vectoriales para uso en aplicaciones.
- **Prop-Types**: Biblioteca para validar las propiedades de los componentes de React.

### Dependencias del Frontend
```json
{
  "@fortawesome/fontawesome-svg-core": "^6.6.0",
  "@fortawesome/free-brands-svg-icons": "^6.6.0",
  "@fortawesome/free-solid-svg-icons": "^6.6.0",
  "@fortawesome/react-fontawesome": "^0.2.2",
  "axios": "^1.7.7",
  "bootstrap": "^5.3.3",
  "bootstrap-icons": "^1.11.3",
  "prop-types": "^15.8.1",
  "react": "^18.3.1",
  "react-bootstrap": "^2.10.4",
  "react-dom": "^18.3.1",
  "react-icons": "^5.3.0",
  "react-router-dom": "^6.26.2",
  "sweetalert": "^2.1.2"
}
```
### Backend

- **Node.js**: Entorno de ejecución para JavaScript en el servidor.
- **Express.js**: Framework minimalista para aplicaciones web en Node.js.
- **Mongoose**: Biblioteca de modelado de objetos MongoDB para Node.js.
- **jsonwebtoken**: Implementación de JWT (JSON Web Tokens) para la autenticación.
- **bcryptjs**: Biblioteca para la encriptación de contraseñas.
- **Cloudinary**: Servicio de almacenamiento y gestión de imágenes.
- **dotenv**: Carga variables de entorno desde un archivo .env.
- **CORS**: Middleware para habilitar CORS (Cross-Origin Resource Sharing).

Dependencias del Backend

```json
{
  "bcryptjs": "^2.4.3",
  "cloudinary": "^2.4.0",
  "cookie-parser": "^1.4.6",
  "cors": "^2.8.5",
  "dotenv": "^16.4.5",
  "express": "^4.21.0",
  "jsonwebtoken": "^9.0.2",
  "mongoose": "^8.7.0"
}
{
  "nodemon": "^3.1.4"
}

```
### Estructura del Proyecto

#Frontend
src/
├── components/           # Componentes reutilizables como NavBar, Footer, HomeCards, etc.
├── pages/               # Páginas principales como ShoppingCart, Event, Profile, etc.
├── context/             # Contextos globales para manejar estados compartidos.
├── assets/              # Imágenes y otros recursos estáticos.
└── App.jsx              # Punto de entrada de la aplicación, configuración de rutas.

#Backend
src/
├── controllers/         # Lógica de los controladores para usuarios, eventos, compras, etc.
├── models/              # Modelos de base de datos, como User, Event, Purchase.
├── routes/              # Definición de las rutas de la API.
├── utils/               # Funciones auxiliares como createRole.
└── config/              # Configuración de variables de entorno y conexión a MongoDB.

### Instalación y Configuración

#Requisitos Previos

- **Node.js**: Instalar la última versión.
- **MongoDB**: Tener un servidor local.


### Instrucciones de Instalación

Clona el repositorio:

git clone https://github.com/camiiprd/tiquetazofront.git

### Navega a la carpeta del frontend e instala las dependencias:

cd tiquetazo/frontend
npm install
Haz lo mismo para el backend:

cd ../backend
npm install

#Crea un archivo .env en el backend con las variables de entorno necesarias:

.env
PORT=4000
MONGO_URI=mongodb+srv://<usuario>:<password>@cluster0.mongodb.net/tiquetazo
JWT_SECRET=tu_secreto
CLOUDINARY_API_KEY=xxxxxx

###Inicia ambos servidores:

## Frontend:
npm run dev
## Backend:
npm run dev

# Endpoints del Backend

Usuarios (/api/users)
POST /register: Registro de nuevos usuarios.
POST /login: Iniciar sesión con email y contraseña.
Eventos (/api/events)
GET /: Obtener todos los eventos.
GET /

: Obtener un evento por ID.

POST /: Crear un nuevo evento (admin).
Compras (/api/purchases)
GET /: Obtener historial de compras del usuario autenticado.
POST /: Crear una nueva compra.
Categorías (/api/categories)
GET /: Obtener todas las categorías disponibles.
Guía de Uso

#Página de Inicio: Muestra eventos destacados y permite buscar vuelos o eventos. Incluye botones de navegación hacia otras secciones del sitio.

#Carrito de Compras: Gestiona la selección de eventos o productos de merchandising, mostrando el total y opciones para eliminar o finalizar la compra.

### Flujos de Trabajo
Comprar un Boleto de Concierto
Navegar a la lista de eventos.
Seleccionar un evento y hacer clic en "COMPRAR".
Revisar el carrito y proceder al pago.


### Cómo Contribuir

Crear una nueva rama desde el develop con el formato feature/nueva-funcionalidad o fix/descripcion-del-fix.
Realizar cambios y hacer un commit claro:

git add .
git commit -m "Añadida funcionalidad de login"
Enviar un pull request para revisión de código.
Control de Versiones
Ramas:
main: Código en producción.
develop: Integración continua.
feature/: Ramas para nuevas características.
Pull Requests: Todo cambio debe ser revisado por al menos un miembro del equipo antes de fusionarse.
Pruebas
Pruebas Unitarias (Backend)
Ejecutar los tests con:

npm test