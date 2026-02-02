# 🚀 JobFinder - Plataforma de Búsqueda de Empleo

JobFinder es una aplicación Full Stack diseñada para facilitar la búsqueda y gestión de ofertas laborales.
Permite a los usuarios buscar empleos, ver detalles, guardar favoritos y simular postulaciones.

# 📸 Galería de la Aplicación

<p align="center">
  <img src="./img/inicio.png" alt="Pantalla de Inicio" width="800" style="border-radius: 10px; box-shadow: 0px 4px 10px rgba(0,0,0,0.2);">
  <br>
  <em>Vista principal con listado de ofertas y filtros</em>
</p>

<br>

<table>
  <tr>
    <td width="50%">
      <h3 align="center">🔐 Autenticación</h3>
      <div align="center">
        <img src="./img/login.png" width="400" alt="Login y Registro">
      </div>
      <p align="center">Login y Registro seguro de usuarios.</p>
    </td>
    <td width="50%">
      <h3 align="center">📄 Detalle de Oferta</h3>
      <div align="center">
        <img src="./img/detalleoferta.png" width="400" alt="Detalle del empleo">
      </div>
      <p align="center">Vista profunda con descripción completa y requisitos.</p>
    </td>
  </tr>
  <tr>
    <td width="50%">
      <h3 align="center">👤 Perfil de Usuario</h3>
      <div align="center">
        <img src="./img/editarperfil.png" width="400" alt="Edición de Perfil">
      </div>
      <p align="center">Gestión de datos personales y skills.</p>
    </td>
    <td width="50%">
      <h3 align="center">💾 Guardados</h3>
      <div align="center">
        <img src="./img/guardado.png" width="400" alt="Empleos Guardados">
      </div>
      <p align="center">Lista de favoritos para revisar luego.</p>
    </td>
  </tr>
  <tr>
    <td colspan="2">
      <h3 align="center">✅ Historial de Postulaciones</h3>
      <div align="center">
        <img src="./img/mispostulaciones.png" width="600" alt="Mis Postulaciones">
      </div>
      <p align="center">Seguimiento de las ofertas aplicadas.</p>
    </td>
  </tr>
</table>

## 🛠️ Tecnologías Utilizadas

### Backend (API REST)

- **Java 21** con **Spring Boot 3**
- **Spring Data JPA** & **Hibernate** (MySQL)
- **Lombok** (Reducción de boilerplate)
- **OpenAPI / Swagger** (Documentación automática)
- **Arquitectura:** Controladores, Servicios, Repositorios, DTOs y Mappers.

### Frontend (SPA)

- **React + Vite**
- **Tailwind CSS** (Estilos modernos y responsivos)
- **React Router** (Navegación)
- **SweetAlert2** (Notificaciones)

## ✨ Funcionalidades Principales

1.  **Búsqueda Inteligente:** Filtros por ID interno o búsqueda externa simulada.
2.  **Gestión de Candidatos:** Perfil de usuario, historial de postulaciones y empleos guardados.
3.  **Documentación Viva:** API totalmente documentada con Swagger UI.
4.  **UX Robusta:** Manejo de estados de carga, errores 404 y fallback de datos.

## 📖 Documentación de la API

Puedes ver y probar todos los endpoints disponibles a través de Swagger UI:
`http://localhost:8080/swagger-ui/index.html`

<img src="./img/swagger.png" alt="Pantalla de Inicio" width="800" style="border-radius: 10px; box-shadow: 0px 4px 10px rgba(0,0,0,0.2);">

## ⚙️ Instalación y Ejecución

### 1. Clonar el repositorio

\`\`\`bash
git clone https://github.com/tirricai/JobFinder.git
\`\`\`

### 2. Backend (Spring Boot)

1.  Configura tu base de datos MySQL en `application.properties`.
2.  Ejecuta el proyecto:
    \`\`\`bash
    cd backend
    ./mvnw spring-boot:run
    \`\`\`

### 3. Frontend (React)

1.  Instala las dependencias:
    \`\`\`bash
    cd frontend
    npm install
    \`\`\`
2.  Inicia el servidor de desarrollo:
    \`\`\`bash
    npm run dev
    \`\`\`

---

La creacion de este sitio se baso en la lucha diaria que tenemos los devs para encontrar trabajo.
JuanP.
