# Backend Finanzas (Sequelize)

Microservicio para gestionar ventas y gastos usando Node.js, Express, PostgreSQL y Sequelize con migraciones. No incluye frontend.
Comparte la misma base de datos con el microservicio de autenticacion.

## Requisitos

- Node.js 18+
- PostgreSQL 13+

## Instalacion

```bash
npm install
```

## Variables de entorno

Crea un archivo `.env` en la raiz del proyecto:

```env
PORT=4001
DB_HOST=localhost
DB_PORT=5432
DB_NAME=finanzas_db
DB_USER=postgres
DB_PASSWORD=postgres
JWT_SECRET=super_secret_key
```

## Migraciones

```bash
npm run migrate
```

Para revertir:

```bash
npm run migrate:undo
```

## Scripts

- `npm run dev` inicia el servidor en modo desarrollo
- `npm start` inicia el servidor
- `npm run migrate` ejecuta migraciones

## Postman

Coleccion: `postman_collection.json`.

## Endpoints

Base URL: `http://localhost:4001`

### POST /ventas

Requiere `Authorization: Bearer <token>`.

Body:

```json
{
  "fecha": "2026-01-01",
  "categoria": "servicios",
  "monto": 1500.5,
  "descripcion": "Venta mensual"
}
```

### GET /ventas

Filtros soportados:

- `?period=day|week|month|year&date=YYYY-MM-DD`
- `?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD`

### PUT /ventas/:id

Requiere `Authorization: Bearer <token>`.

Body (campos opcionales):

```json
{
  "fecha": "2026-01-05",
  "categoria": "servicios",
  "monto": 1800,
  "descripcion": "Actualizado"
}
```

### DELETE /ventas/:id

Requiere `Authorization: Bearer <token>`.

Borrado logico (soft delete).

### POST /gastos

Requiere `Authorization: Bearer <token>`.

Body:

```json
{
  "fecha": "2026-01-02",
  "categoria": "operacion",
  "monto": 300,
  "descripcion": "Pago proveedor"
}
```

### GET /gastos

Mismos filtros que `/ventas`.

### PUT /gastos/:id

Requiere `Authorization: Bearer <token>`.

### DELETE /gastos/:id

Requiere `Authorization: Bearer <token>`.

Borrado logico (soft delete).

### GET /dashboard/line-chart

Devuelve datos agregados por fecha para ventas y gastos. Acepta los mismos filtros que `/ventas`.

### POST /import-json

Requiere `Authorization: Bearer <token>`.

Carga masiva desde JSON.

Body:

```json
{
  "ventas": [
    { "fecha": "2026-01-01", "categoria": "servicios", "monto": 100, "descripcion": "A" }
  ],
  "gastos": [
    { "fecha": "2026-01-02", "categoria": "operacion", "monto": 50, "descripcion": "B" }
  ]
}
```

Respuesta 201:

```json
{ "ventas": 1, "gastos": 1 }
```

## Base de datos

Tablas:

- `ventas`: id, fecha, categoria, monto, descripcion, user_id, created_at, updated_at, deleted_at
- `gastos`: id, fecha, categoria, monto, descripcion, user_id, created_at, updated_at, deleted_at

## Notas

- Las eliminaciones usan `deleted_at` (soft delete).
- `user_id` se completa a partir del JWT emitido por el microservicio de auth.
- Los filtros por fecha funcionan con `fecha` (DATEONLY).
