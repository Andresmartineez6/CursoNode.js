//importar el router de Express
import {Router} from 'express'

import { InMemoryUserRepo } from 'infrastructure/repositories/inMemoryUserRepo';

import { CreateEmployee } from 'application/use-cases/CreateEmployee';
import { DeleteEmployee } from 'application/use-cases/DeleteEmployee';
import { GetEmployee } from 'application/use-cases/GetEmployee';
import { GetAllEmployees } from 'application/use-cases/GetAllEmployees';
import { UpdateEmployee } from 'application/use-cases/UpdateEmployee';
import { FindByFilter } from 'application/use-cases/FindByFilter';

import {EmployeeController} from '../controlers/EmployeeController';
const router = Router();

//implementeamos los user controller e inmemoryRepo
const repo = new InMemoryUserRepo();
const controller = new EmployeeController(
    new CreateEmployee(repo),
    new DeleteEmployee(repo),
    new GetAllEmployees(repo),
    new GetEmployee(repo),
    new UpdateEmployee(repo),
    new FindByFilter(repo),
);

//tienen que ir los casos de get de más específico a más general, porque si no como tengas el general arriba la query entra al primero que pille y le coincida y ya cagaste
router.get('/filter', controller.filter); 
router.get('/:id', controller.get);
router.get('/', controller.getAll);

router.post('/', controller.create);

router.put('/:id', controller.update);

router.delete('/:id', controller.delete); 

//LO EXPORTAS PARA USARLO EN EL INDEX
export {router}