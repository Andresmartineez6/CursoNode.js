import { v4 as uuid } from 'uuid';
import { Employee } from 'domain/models/Employee';
import { EmployeeRepository } from 'domain/repositories/EmployeeRepository';

//una clase que solo hace una cosa
export class CreateEmployee {
    constructor(private readonly userRepo: EmployeeRepository){

    }

    async execute(id: string, name: string, lastName:string, position: "junior" | "senior" | "teamLeader" | "ceo", salary: number, contractTermination: string, team: string, yearsOfService: number) {
        const employee = new Employee(uuid(), name, lastName, position, salary, contractTermination, team,  yearsOfService)
        await this.userRepo.create(employee);
        return employee
    }
}