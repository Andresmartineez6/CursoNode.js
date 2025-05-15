
// test de la integracion, no del caso de uso, probamos si funciona correctamente crear el user desde un post 
import express from 'express';
import request from 'supertest';

//importas el router
import  { router } from 'interfaces/http/routes/employeeRoutes';
import { Employee } from 'domain/models/Employee';

const app = express();
app.use(express.json());
app.use('/employee',router)





describe('User routes', async ()=>{
    //estás creando un empleado fuera, teniendo que hacer async el describe, para tener un solo empleado con el que trabajar en todos los test, porque si lo creas dentro del test y al get no le haces crear a su vez un empleado te va a decir que espera un empleado creado qeu se ha creado en el test del post, así tienes uno para trabajar con todos los tests
    const res = await request(app).post('/employee').send({name: "Manolo", lastName: "Manolez"});
    const employeeId = res.body.id

    //realmente no necesitamos crear el user dentro para saber que el teste funciona, lo que necesitamos el los expect, y funcionan, la creacion se está haciendo arriba y matchea con lo que esperas
    it('POST /employee should create a user', async()=>{
        //te faltan 6 exptecs
        expect(res.status).toBe(201);
        expect(res.body.name).toBe('Manolo');
    });

  

    // OTRO TEST, aqui se hace en el mismo archivo, en los casos de uso haces un archivo por cada test
    it('GET /employee should get all employees ', async()=>{
        const res = await request(app).get('/employee');
        expect(res.status).toBe(200);
        expect(res.body).toMatchObject([{id:employeeId ,name: "Manolo", lastName: "Manolez"}])
    })

       //OTRO TEST, ID
    it('GET /employee should get all employees ', async()=>{
       
        //buscamos por ese id creado
        const res = await request(app).get(`/employee/${employeeId}`);
        expect(res.status).toBe(200);
        //esperamos que reciba los datos correspondientes
        expect(res.body).toMatchObject({
            id:employeeId,
            name: "Manolo",
            lastName: "Manolez"
        })
    })


})



    // //OTRO TEST, ID
    // it('GET /employee should get all employees ', async()=>{
    //     //hay que crear una response para tener un id con el que matchear, se deberia poder hacer más facil pero no funcion
    //     const createResponse = await request(app).post('/employee').send({name: "Manolo", lastName: "Manolez"});
    //     const employeeId = createResponse.body.id;

    //     //buscamos por ese id creado
    //     const res = await request(app).get(`/employee/${employeeId}`);
    //     expect(res.status).toBe(200);
    //     //esperamos que reciba los datos correspondientes
    //     expect(res.body).toMatchObject({
    //         id:employeeId,
    //         name: "Manolo",
    //         lastName: "Manolez"
    //     })
    // })
