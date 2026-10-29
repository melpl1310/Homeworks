# SupabaseApp

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 22.2.3.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Configuración de Supabase

El cliente Angular ya contiene una URL de proyecto y una clave publicable en `src/app/enviroments/enviroment.ts`. Para crear o usar el proyecto:

1. Crea un proyecto en el panel de Supabase o abre el proyecto que corresponde a esa URL.
2. En **SQL Editor**, ejecuta [`supabase/setup.sql`](./supabase/setup.sql). El script crea `public.tareas`, activa RLS con acceso solo a las tareas del usuario autenticado, crea el bucket privado `avatars` con límite de 2 MB y habilita la tabla en `supabase_realtime`.
3. Si ya hay tareas duplicadas para el mismo usuario (ignorando mayúsculas y espacios al inicio/final), el script se detiene para evitar borrar datos. Renombra o elimina esos duplicados y ejecútalo de nuevo.
4. En **Authentication**, habilita el proveedor Email. Si se requiere confirmar correo, configura las URL de redirección del sitio en el panel.
5. Si creaste un proyecto nuevo, reemplaza la URL y la clave publicable del archivo de entorno con los valores de ese mismo proyecto.

El registro, el inicio/cierre de sesión, el CRUD de tareas, la carga/lectura de avatares y la suscripción en tiempo real están implementados en la aplicación. La configuración remota solo queda activa después de ejecutar el SQL en el proyecto de Supabase.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
