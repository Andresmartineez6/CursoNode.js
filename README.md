# API de Gestión de Empleados

## Descripción

Esta API RESTful de gestión de empleados está desarrollada con Node.js, Express y TypeScript, siguiendo los principios de Clean Architecture y SOLID. Permite realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre empleados, así como funcionalidades avanzadas de filtrado, ordenamiento y paginación.

## Características

- **Arquitectura Limpia**: Separación clara entre dominio, aplicación e infraestructura
- **Operaciones CRUD completas** para la gestión de empleados
- **Filtrado** de empleados por nombre y posición
- **Ordenamiento** por múltiples campos (nombre, apellido, posición, salario, años de servicio)
- **Paginación offset-based** con metadatos de navegación
- **Tests unitarios e integración** con Vitest y Supertest
- **Validación de datos** y manejo de errores
- **TypeScript** para tipado estático y mejor desarrollo

## Estructura del Proyecto

```
src/
├── domain/              # Reglas y entidades de negocio
│   ├── models/          # Modelos de dominio (Employee)
│   └── repositories/    # Interfaces de repositorios
├── application/         # Casos de uso de la aplicación
│   └── use-cases/       # Implementación de casos de uso
├── infrastructure/      # Adaptadores y frameworks
│   └── repositories/    # Implementaciones concretas de repositorios
└── interfaces/          # Interfaces de usuario y API
    └── http/            # Controladores y rutas HTTP
        ├── controllers/ # Controladores de Express
        └── routes/      # Definición de rutas
tests/
├── unit/               # Tests unitarios
└── integration/        # Tests de integración
```

## Endpoints de la API

### Empleados

- `GET /employee`: Obtiene todos los empleados
- `GET /employee/:id`: Obtiene un empleado por su ID
- `POST /employee`: Crea un nuevo empleado
- `PUT /employee/:id`: Actualiza un empleado existente
- `DELETE /employee/:id`: Elimina un empleado

### Filtrado, Ordenamiento y Paginación

- `GET /employee/filter?name=valor&position=valor`: Filtra empleados por nombre y/o posición
- `GET /employee/sort?sortBy=campo&order=asc|desc`: Ordena empleados por un campo específico
  - Campos disponibles: `name`, `lastName`, `position`, `salary`, `yearsOfService`
  - Orden: `asc` (ascendente) o `desc` (descendente)
- `GET /employee/paginate?page=1&limit=10`: Pagina los resultados
  - `page`: Número de página (por defecto: 1)
  - `limit`: Elementos por página (por defecto: 10, máximo: 100)

## Modelo de Datos

### Empleado (Employee)

```typescript
{
  id: string;              // Identificador único
  name: string;            // Nombre del empleado
  lastName: string;        // Apellido del empleado
  position: string;        // Posición (junior, senior, teamLeader, ceo)
  salary: number;          // Salario
  contractTermination: string; // Fecha de finalización de contrato
  team: string;            // Equipo al que pertenece
  yearsOfService: number;  // Años de servicio
}
```

## Instalación y Ejecución

### Requisitos Previos

- Node.js (v14 o superior)
- npm o yarn

### Pasos de Instalación

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/Andresmartineez6/CursoNode.js.git
   cd CursoNode.js
   ```

2. Instalar dependencias:
   ```bash
   npm install
   ```

3. Ejecutar en modo desarrollo:
   ```bash
   npm run dev
   ```

4. Ejecutar tests:
   ```bash
   npm test
   ```

## Ejemplos de Uso

### Crear un Empleado

```bash
POST /employee
Content-Type: application/json

{
  "id": "1",
  "name": "Juan",
  "lastName": "Pérez",
  "position": "senior",
  "salary": 60000,
  "contractTermination": "2025-12-31",
  "team": "Frontend",
  "yearsOfService": 5
}
```

### Filtrar Empleados

```bash
GET /employee/filter?position=senior
```

### Ordenar Empleados por Salario (Descendente)

```bash
GET /employee/sort?sortBy=salary&order=desc
```

### Paginar Resultados

```bash
GET /employee/paginate?page=2&limit=5
```

## Tecnologías Utilizadas

- **Node.js**: Entorno de ejecución
- **Express**: Framework web
- **TypeScript**: Lenguaje de programación
- **Vitest**: Framework de testing
- **Supertest**: Testing de API HTTP
- **ESLint**: Linting de código
- **Prettier**: Formateo de código
- **Husky**: Git hooks para control de calidad

## Principios de Diseño

- **Clean Architecture**: Separación de responsabilidades en capas
- **SOLID**: Principios de diseño orientado a objetos
- **Dependency Injection**: Inversión de control para testing
- **Repository Pattern**: Abstracción del acceso a datos
- **Use Case Pattern**: Encapsulación de la lógica de negocio

## Licencia

MIT
