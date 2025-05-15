import { Employee } from 'domain/models/Employee';
import { EmployeeRepository } from 'domain/repositories/EmployeeRepository';

export class GetEmployee {
    constructor(private readonly employeeRepository: EmployeeRepository){}

    async execute(id: string): Promise<Employee>{
        const employee = await this.employeeRepository.findById(id);

        if(!employee) throw new Error("User not found");

        return employee;
    }
}