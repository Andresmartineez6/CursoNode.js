import { EmployeeRepository } from 'context/crud/domain/repositories/EmployeeRepository';

export class UpdateEmployee {
  constructor(private readonly employeeRepository: EmployeeRepository) {}
  async execute(
    id: string,
    position: 'junior' | 'senior' | 'teamLeader' | 'ceo',
    salary: number,
  ) {
    const employee = await this.employeeRepository.findById(id);
    if (!employee) throw new Error('User not found');

    employee.changeSalary(salary);
    employee.changePosition(position);

    await this.employeeRepository.update(employee);

    return employee;
  }
}
