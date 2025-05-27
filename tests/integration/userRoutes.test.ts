// test de la integracion, no del caso de uso, probamos si funciona correctamente crear el user desde un post
import express from 'express';
import request from 'supertest';

//importas el router
import { router } from 'context/crud/interfaces/http/routes/employeeRoutes';

const app = express();
app.use(express.json());
app.use('/employee', router);

describe('User routes', async () => {


  // Crear un empleado para usar en todos los tests
  const createRes = await request(app).post('/employee').send({
    name: 'Manolo',
    lastName: 'Manolez',
    position: 'junior',
    salary: 2000,
    contractTermination: '27-7-2026',
    team: 'team4',
    yearsOfService: 4,
  });
  const employeeId = createRes.body.id;


  it('POST /employee should create a user', async () => {
    // Verificar la respuesta de creación
    expect(createRes.status).toBe(201);
    expect(createRes.body.name).toBe('Manolo');
    expect(createRes.body.lastName).toBe('Manolez');
    expect(createRes.body.position).toBe('junior');
    expect(createRes.body.salary).toBe(2000);
    expect(createRes.body.contractTermination).toBe('27-7-2026');
    expect(createRes.body.team).toBe('team4');
    expect(createRes.body.yearsOfService).toBe(4);
  });



  it('GET /employee should get all employees', async () => {
    const res = await request(app).get('/employee');
    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThanOrEqual(1);
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: employeeId,
          name: 'Manolo',
          lastName: 'Manolez',
        }),
      ]),
    );
  });



  it('GET /employee/:id should get a specific employee', async () => {
    // Buscar por el ID creado
    const res = await request(app).get(`/employee/${employeeId}`);
    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({
      id: employeeId,
      name: 'Manolo',
      lastName: 'Manolez',
      position: 'junior',
    });
  });



  it('PUT /employee/:id should update an employee', async () => {
    // Actualizar el empleado
    const updateRes = await request(app).put(`/employee/${employeeId}`).send({
      position: 'senior',
      salary: 3500,
    });

    expect(updateRes.status).toBe(200);
    expect(updateRes.body.position).toBe('senior');
    expect(updateRes.body.salary).toBe(3500);

    // Verificar que el empleado fue actualizado
    const getRes = await request(app).get(`/employee/${employeeId}`);
    expect(getRes.body.position).toBe('senior');
    expect(getRes.body.salary).toBe(3500);
  });



  it('GET /employee/filter should filter employees by name', async () => {
    // Crear otro empleado para probar el filtrado
    await request(app).post('/employee').send({
      name: 'Ana',
      lastName: 'García',
      position: 'senior',
      salary: 3500,
      contractTermination: '15-3-2027',
      team: 'team2',
      yearsOfService: 7,
    });

    // Filtrar por nombre
    const res = await request(app).get('/employee/filter?name=Ana');
    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThanOrEqual(1);
    expect(res.body[0].name).toBe('Ana');
  });



  it('GET /employee/filter should filter employees by position', async () => {
    // Filtrar por posición
    const res = await request(app).get('/employee/filter?position=senior');
    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThanOrEqual(1);
    expect(res.body[0].position).toBe('senior');
  });



  it('DELETE /employee/:id should delete an employee', async () => {
    // Crear un empleado para eliminar
    const createTempRes = await request(app).post('/employee').send({
      name: 'Temporal',
      lastName: 'Borrable',
      position: 'junior',
      salary: 1800,
      contractTermination: '10-1-2025',
      team: 'team3',
      yearsOfService: 1,
    });

    const tempEmployeeId = createTempRes.body.id;

    // Eliminar el empleado
    const deleteRes = await request(app).delete(`/employee/${tempEmployeeId}`);
    expect(deleteRes.status).toBe(204);

    // Verificar que el empleado fue eliminado
    const getRes = await request(app).get(`/employee/${tempEmployeeId}`);
    expect(getRes.status).toBe(404);
  });



});
