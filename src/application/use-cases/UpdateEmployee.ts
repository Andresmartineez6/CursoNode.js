import { Employee } from 'domain/models/Employee';
import { EmployeeRepository } from 'domain/repositories/EmployeeRepository';
import { emit } from 'process';

export class UpdateEmployee {
    constructor(private readonly employeeRepository: EmployeeRepository){

    }
    async execute(id: string, position: "junior" | "senior" | "teamLeader" | "ceo", salary: number ){
        
        const employee = await this.employeeRepository.findById(id);
        if(!Employee) throw new Error(" User not found");
    
        employee.changeSalary(salary);
        employee.changePosition(position);
    
        await this.employeeRepository.update(employee);
    
        return employee;

    }

}