/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response, Request } from 'express';

// import all use cases
import { CreateEmployee } from 'context/crud/application/use-cases/CreateEmployee';
import { DeleteEmployee } from 'context/crud/application/use-cases/DeleteEmployee';
import { GetAllEmployees } from 'context/crud/application/use-cases/GetAllEmployees';
import { GetEmployee } from 'context/crud/application/use-cases/GetEmployee';
import { UpdateEmployee } from 'context/crud/application/use-cases/UpdateEmployee';
import { FindByFilter } from 'context/crud/application/use-cases/FindByFilter';
import { SortEmployees, SortField, SortOrder } from 'context/crud/application/use-cases/SortEmployees';
import { PaginateEmployees } from 'context/crud/application/use-cases/PaginateEmployees';




export class EmployeeController {
  constructor(
    private readonly createEmployee: CreateEmployee,
    private readonly deleteEmployee: DeleteEmployee,
    private readonly getAllEmployees: GetAllEmployees,
    private readonly getEmployee: GetEmployee,
    private readonly UpdateEmployee: UpdateEmployee,
    private readonly findByFilter: FindByFilter,
    private readonly sortEmployees: SortEmployees,
    private readonly paginateEmployees: PaginateEmployees
  ) {}

  create = async (req: Request, res: Response) => {
    try {
      console.log('ID recibido en controller:', req.params.id);
      const {
        id,
        name,
        lastName,
        position,
        salary,
        contractTermination,
        team,
        yearsOfService,
      } = req.body;
      const employee = await this.createEmployee.execute(
        id,
        name,
        lastName,
        position,
        salary,
        contractTermination,
        team,
        yearsOfService,
      );
      res.status(201).json(employee);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  };

  get = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const employee = await this.getEmployee.execute(id);
      res.json(employee);
    } catch (err: any) {
      res.status(404).json({ error: err.message });
    }
  };

  getAll = async (req: Request, res: Response) => {
    try {
      const employees = await this.getAllEmployees.execute();
      res.status(200).json(employees);
    } catch (err: any) {
      res.status(404).json({ error: err.message });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { position, salary } = req.body;
      const employee = await this.UpdateEmployee.execute(id, position, salary);
      res.status(200).json(employee);
    } catch (err: any) {
      res.status(404).json({ error: err.message });
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const employee = await this.deleteEmployee.execute(id);
      res.status(204).json(employee);
    } catch (err: any) {
      res.status(404).json({ error: err.message });
    }
  };

  filter = async (req: Request, res: Response) => {
    try {
      const filter: Partial<{ name: string; position: "junior" | "senior" | "teamLeader" | "ceo" }> = req.query;
      const employee = await this.findByFilter.execute(filter);
      res.status(200).json(employee);
    } catch (err: any) {
      res.status(404).json({ error: err.message });
    }
  };

  sort = async (req: Request, res: Response) => {
    try {
      const sortField = req.query.sortBy as SortField || 'name';
      const sortOrder = req.query.order as SortOrder || 'asc';
      
      const employees = await this.sortEmployees.execute(sortField, sortOrder);
      res.status(200).json(employees);
    } catch (err: any) {
      res.status(404).json({ error: err.message });
    }
  };

  paginate = async (req: Request, res: Response) => {
    try {
      const pagina = parseInt(req.query.pagina as string) || 1;
      const limite = parseInt(req.query.limite as string) || 10;
      
      const resultado = await this.paginateEmployees.execute(pagina, limite);
      res.status(200).json(resultado);
    } catch (err: any) {
      res.status(404).json({ error: err.message });
    }
  };
}
