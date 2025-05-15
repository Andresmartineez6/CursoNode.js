import { Employee } from 'domain/models/Employee';
import { EmployeeRepository } from 'domain/repositories/EmployeeRepository';

export class FindByFilter {
    constructor(private readonly employeeRepository: EmployeeRepository){}

    async execute(filter: Partial<{name: string; position: 'junior' | 'senior' | 'teamLeader' | 'ceo'}>): Promise<Employee[]>{
        const employee = await this.employeeRepository.findByFilter(filter);
        if(!employee) throw new Error("Nothing found ");
        return employee

    //    if(name){
    //        const employee = await this.employeeRepository.findByFilter(name);

    //    }
    //    if(position === undefined){

    //    }
    //     return employee;
    }
}