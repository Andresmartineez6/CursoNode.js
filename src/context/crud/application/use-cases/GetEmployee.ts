import { Employee } from 'context/crud/domain/models/Employee';
import { EmployeeRepository } from 'context/crud/domain/repositories/EmployeeRepository';

export class GetEmployee {
  constructor(private readonly employeeRepository: EmployeeRepository) {}

  async execute(id: string): Promise<Employee> {
    const employee = await this.employeeRepository.findById(id);

    if (!employee) throw new Error('User not found');

    return employee;
  }
}
