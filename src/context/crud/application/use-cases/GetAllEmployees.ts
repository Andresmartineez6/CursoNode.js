import { EmployeeRepository } from 'context/crud/domain/repositories/EmployeeRepository';

export class GetAllEmployees {
  constructor(private readonly employeeRepository: EmployeeRepository) {}
  async execute() {
    return await this.employeeRepository.findAll();
  }
}
