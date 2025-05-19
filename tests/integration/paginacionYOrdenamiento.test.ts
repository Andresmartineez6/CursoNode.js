/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import express from 'express';
import { Router } from 'express';
import { Employee } from '../../src/domain/models/Employee';
import { InMemoryUserRepo } from '../../src/infrastructure/repositories/inMemoryUserRepo';

// Importamos los casos de uso directamente
import { CreateEmployee } from '../../src/application/use-cases/CreateEmployee';
import { DeleteEmployee } from '../../src/application/use-cases/DeleteEmployee';
import { GetEmployee } from '../../src/application/use-cases/GetEmployee';
import { GetAllEmployees } from '../../src/application/use-cases/GetAllEmployees';
import { UpdateEmployee } from '../../src/application/use-cases/UpdateEmployee';
import { FindByFilter } from '../../src/application/use-cases/FindByFilter';
import { SortEmployees } from '../../src/application/use-cases/SortEmployees';
import { PaginateEmployees } from '../../src/application/use-cases/PaginateEmployees';
import { EmployeeController } from '../../src/interfaces/http/controlers/EmployeeController';



describe('Pruebas de integración para ordenamiento y paginación', () => {
  // Creamos un repositorio compartido para todas las pruebas
  const repo = new InMemoryUserRepo();
  let app: express.Express;
  
  // Configuramos la aplicación antes de cada prueba
  beforeEach(() => {
    // Creamos una nueva instancia de Express
    app = express();
    app.use(express.json());
    
    // Creamos un nuevo router con nuestro repositorio de prueba
    const testRouter = Router();
    const controller = new EmployeeController(
      new CreateEmployee(repo),
      new DeleteEmployee(repo),
      new GetAllEmployees(repo),
      new GetEmployee(repo),
      new UpdateEmployee(repo),
      new FindByFilter(repo),
      new SortEmployees(repo),
      new PaginateEmployees(repo)
    );
    
    // Configuramos las rutas igual que en el router original
    testRouter.get('/filter', controller.filter);
    testRouter.get('/sort', controller.sort);
    testRouter.get('/paginate', controller.paginate);
    testRouter.get('/:id', controller.get);
    testRouter.get('/', controller.getAll);
    testRouter.post('/', controller.create);
    testRouter.put('/:id', controller.update);
    testRouter.delete('/:id', controller.delete);
    
    // Usamos nuestro router de prueba
    app.use('/employee', testRouter);
  });

  // Test para el endpoint de ordenamiento
  describe('Endpoint de ordenamiento', () => {
    it('debería ordenar empleados por nombre en orden ascendente por defecto', async () => {
      // Limpiar el repositorio antes de la prueba
      await repo.clear();

      // Añadir empleados de prueba
      await repo.create(new Employee('1', 'Carlos', 'Rodríguez', 'senior', 60000, '2030-01-01', 'Frontend', 5));
      await repo.create(new Employee('2', 'Ana', 'Martínez', 'junior', 40000, '2030-01-01', 'Backend', 2));
      await repo.create(new Employee('3', 'Javier', 'López', 'teamLeader', 80000, '2030-01-01', 'Mobile', 8));

      const response = await request(app)
        .get('/employee/sort')
        .expect(200);

      expect(response.body).toBeInstanceOf(Array);
      expect(response.body.length).toBeGreaterThan(0);
      
      // Verificar que los nombres están ordenados alfabéticamente
      const names = response.body.map((emp: any) => emp.name);
      expect(names[0]).toBe('Ana');
      expect(names[1]).toBe('Carlos');
      expect(names[2]).toBe('Javier');
    });

    it('debería ordenar empleados por salario en orden descendente', async () => {
      // Limpiar el repositorio antes de la prueba
      await repo.clear();

      // Añadir empleados de prueba
      await repo.create(new Employee('1', 'Carlos', 'Rodríguez', 'senior', 60000, '2030-01-01', 'Frontend', 5));
      await repo.create(new Employee('2', 'Ana', 'Martínez', 'junior', 40000, '2030-01-01', 'Backend', 2));
      await repo.create(new Employee('3', 'Javier', 'López', 'teamLeader', 80000, '2030-01-01', 'Mobile', 8));

      const response = await request(app)
        .get('/employee/sort?sortBy=salary&order=desc')
        .expect(200);

      expect(response.body).toBeInstanceOf(Array);
      expect(response.body.length).toBeGreaterThan(0);
      
      // Verificar que los salarios están ordenados de mayor a menor
      const salaries = response.body.map((emp: any) => emp.salary);
      expect(salaries[0]).toBe(80000);
      expect(salaries[1]).toBe(60000);
      expect(salaries[2]).toBe(40000);
    });
  });

  // Test para el endpoint de paginación
  describe('Endpoint de paginación', () => {
    it('debería paginar empleados con valores por defecto (página 1, límite 10)', async () => {
      // Limpiar el repositorio antes de la prueba
      await repo.clear();

      // Crear 15 empleados de prueba
      for (let i = 1; i <= 15; i++) {
        const employee = new Employee(
          i.toString(),
          `Empleado ${i}`,
          `Apellido ${i}`,
          i % 4 === 0 ? 'teamLeader' : i % 3 === 0 ? 'senior' : 'junior',
          30000 + (i * 2000),
          '2030-01-01',
          i % 2 === 0 ? 'Frontend' : 'Backend',
          i
        );
        await repo.create(employee);
      }

      const response = await request(app)
        .get('/employee/paginate')
        .expect(200);

      expect(response.body).toHaveProperty('datos');
      expect(response.body).toHaveProperty('paginacion');
      expect(response.body.datos).toBeInstanceOf(Array);
      expect(response.body.datos.length).toBeLessThanOrEqual(10);
      expect(response.body.paginacion).toHaveProperty('total');
      expect(response.body.paginacion).toHaveProperty('pagina', 1);
      expect(response.body.paginacion).toHaveProperty('limite', 10);
      expect(response.body.paginacion).toHaveProperty('totalPaginas');
    });

    it('debería paginar empleados con página 2 y límite 5', async () => {
      // Limpiar el repositorio antes de la prueba
      await repo.clear();

      // Crear 15 empleados de prueba
      for (let i = 1; i <= 15; i++) {
        const employee = new Employee(
          i.toString(),
          `Empleado ${i}`,
          `Apellido ${i}`,
          i % 4 === 0 ? 'teamLeader' : i % 3 === 0 ? 'senior' : 'junior',
          30000 + (i * 2000),
          '2030-01-01',
          i % 2 === 0 ? 'Frontend' : 'Backend',
          i
        );
        await repo.create(employee);
      }

      const response = await request(app)
        .get('/employee/paginate?pagina=2&limite=5')
        .expect(200);

      expect(response.body).toHaveProperty('datos');
      expect(response.body).toHaveProperty('paginacion');
      expect(response.body.datos).toBeInstanceOf(Array);
      expect(response.body.datos.length).toBeLessThanOrEqual(5);
      expect(response.body.paginacion).toHaveProperty('pagina', 2);
      expect(response.body.paginacion).toHaveProperty('limite', 5);
    });
  });
});
