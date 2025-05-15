import { Employee } from 'domain/models/Employee';
import { EmployeeRepository } from 'domain/repositories/EmployeeRepository';

export class InMemoryUserRepo implements EmployeeRepository{
     private employees: Employee[]=[

     ];

         async findById(id:string): Promise < Employee | null>{
            return this.employees.find(employee => employee.getId() === id) || null
         }

         async findAll(): Promise <Employee[]>{
            return this.employees;
         }

         async create(employee: Employee): Promise<void>{
            this.employees = [...this.employees, employee];
         }

         async update(employeeParam: Employee): Promise<void>{
            const employee = this.employees.find(employee => employee.getId() === employeeParam.getId())

            if(!employee) throw new Error('User not found');

            this.employees = [
                ...this.employees.filter(employee => employee.getId()!== employeeParam.getId()), employeeParam
            ]
         }

         async delete(id: string): Promise <void>{
            this.employees = this.employees.filter(employee => employee.getId() !== id);
         }

         // async findByFilter(name?: string, position?: 'junior' | 'senior' | 'teamLeader' | 'ceo'): Promise<Employee[]> {
           
         //    if(position=== undefined){
         //       return this.employees.filter(employee => employee.getName() === name);
         //    }

         //    if(name === undefined){
         //       return this.employees.filter(employee => employee.getPosition() === position); 
         //    }
         //    //caso para filtrar por ambos
         //    return this.employees.filter(employee => employee.getPosition() === position && employee.getPosition() === position); 


         // }

         // FORMA DEL PROFESOR 

         async findByFilter(filter: Partial<{name: string; position: 'junior' | 'senior' | 'teamLeader' | 'ceo'}>){
               return this.employees.filter(user =>{
                  // pones el ternario a true, porque si no recibes el filtro de name, pones a true para que pasen todos los names
                 const matchName = filter.name ? user.getName().includes(filter.name): true;
                 //lo mismo con el email, si recibes el filtro por email pues filtra, si no pues true para que pasen todos los emails
                 const matchPosition = filter.position ? user.getPosition().includes(filter.position): true;

                 return matchName && matchPosition;
               })
    }

    async clear(){
         this.employees = [];
    }
}