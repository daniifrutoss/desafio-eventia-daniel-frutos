# Fase 1 - Arquitectura de Eventia

## Preguntas sobre cómo funciona

1. **¿Qué partes tiene la aplicación?**
   Está dividida en dos carpetas principales:
   - **`client/` (Frontend):** Es la web que ves en el navegador (`http://localhost:5173`), la parte visible con la que interactúan los usuarios.
   - **`server/` (Backend):** Es la parte del servidor que trabaja por detrás (`http://localhost:3000`). Digamos que es como el cerebro de la aplicación.

2. **¿De qué se encarga el frontend?**
   El frontend es todo lo visual y con lo que el usuario interactúa: ver el listado de eventos y las plazas disponibles, rellenar los formularios para iniciar sesión con tu cuenta, pulsar el botón de reservar y usar el panel de administración para crear eventos nuevos. Cuando haces clic en algo, le manda la petición al servidor y este la procesa y decide qué hacer con ella.

3. **¿Cómo se comunican ambos componentes?**
   Mediante peticiones HTTP (`GET`, `POST`, `DELETE`) llamando a las rutas de la API del servidor en `http://localhost:3000/api`.

4. **¿Qué información intercambian?**
   Se intercambian en formato JSON para que tanto el cliente como el servidor entiendan la información enviada. Por ejemplo, al iniciar sesión la web manda el correo y la contraseña, y el servidor le devuelve un token de sesión y los datos del usuario.

5. **¿Dónde se guardan los datos?**
   Al ser una aplicación de prácticas, no utiliza una base de datos real. Todos los usuarios, eventos, reservas y tokens activos se guardan en la memoria RAM del proceso del servidor (`server/src/data.js`). En el navegador (cliente) únicamente se almacena el token de la sesión actual.

6. **¿Qué pasa si reinicias el servidor?**
   Como todo está en la memoria RAM del servidor, si lo apagas o lo reinicias se borra cualquier cambio realizado (reservas nuevas, eventos creados o sesiones iniciadas) y vuelven a cargarse los datos iniciales definidos en el código.

## Archivos principales

La aplicación permite consultar los eventos, filtrarlos en el buscador, iniciar sesión, reservar plazas y, si entras como administrador, crear eventos nuevos y ver todas las reservas.

- **En `client/`:**
  - `index.html`: La página web principal.
  - `src/api.js`: Contiene la función `apiRequest`, que hace las llamadas con `fetch` al servidor y añade el token en la cabecera `Authorization`.
  - `src/main.js`: Es el JavaScript que controla la pantalla: pinta los eventos, recoge los datos de los formularios y envía las reservas cuando pulsas el botón.
  - `src/style.css`: El diseño y los colores de la web. Todo lo que le da el aspecto visual.



- **En `server/`:**
  - `src/server.js`: Es el archivo principal del servidor. Arranca Express que un framework para levantar servidores web en Node.js en el puerto 3000, comprueba si el usuario lleva token en la petición y define todas las rutas de la API bajo el prefijo `/api` (`/api/auth/login`, `/api/events`, `/api/reservations`, etc.).
  - `src/data.js`: Contiene los datos iniciales en memoria (los usuarios `ana`, `luis` y `admin`, los 3 eventos iniciales, las reservas y el `Map` de sesiones, que funciona como un diccionario donde se guarda cada token y a qué usuario pertenece).
  - `src/legacy/funciones_inseguras.js`: Un archivo auxiliar aparte que contiene tres funciones independientes (entre ellas una consulta SQL), pero ninguna está conectada ni importada desde el servidor principal.