import { Employee } from 'domain/models/Employee';
import { EmployeeRepository } from 'domain/repositories/EmployeeRepository';
import { InMemoryUserRepo } from 'infrastructure/repositories/inMemoryUserRepo';

export class DeleteEmployee {
    constructor(private readonly employeeRepository: EmployeeRepository){

    }

    async execute(id: string){
        const employee = await this.employeeRepository.findById(id);

        if(!employee) throw new Error("User not found");

        await this.employeeRepository.delete(id);
        

    }
}