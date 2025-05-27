//importar el router de Express
import { Router } from 'express';

import { InMemoryUserRepo } from 'context/crud/infrastructure/repositories/inMemoryUserRepo';

import { CreateEmployee } from 'context/crud/application/use-cases/CreateEmployee';
import { DeleteEmployee } from 'context/crud/application/use-cases/DeleteEmployee';
import { GetEmployee } from 'context/crud/application/use-cases/GetEmployee';
import { GetAllEmployees } from 'context/crud/application/use-cases/GetAllEmployees';
import { UpdateEmployee } from 'context/crud/application/use-cases/UpdateEmployee';
import { FindByFilter } from 'context/crud/application/use-cases/FindByFilter';
import { SortEmployees } from 'context/crud/application/use-cases/SortEmployees';
import { PaginateEmployees } from 'context/crud/application/use-cases/PaginateEmployees';

import { EmployeeController } from '../controlers/EmployeeController';
import { authMiddleware } from 'context/auth/infrastructure/middlewares/authMiddleware';
import { authorizeRoles } from 'context/auth/infrastructure/middlewares/authorizeRoles';
import { UserRole } from 'context/auth/domain/UserRole';




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
  new SortEmployees(repo),
  new PaginateEmployees(repo)
);


router.use(authMiddleware);


//tienen que ir los casos de get de más específico a más general, porque si no como tengas el general arriba la query entra al primero que pille y le coincida y ya cagaste
router.get('/filter', controller.filter);
router.get('/sort', controller.sort);
router.get('/paginate', controller.paginate);
router.get('/:id', controller.get);
router.get('/', controller.getAll);

router.post('/',authorizeRoles([UserRole.ADMIN]) , controller.create);

router.put('/:id', controller.update);

router.delete('/:id', controller.delete);

//LO EXPORTAS PARA USARLO EN EL INDEX
export { router };
