//importas los objetos que vas a usar
import { Employee } from 'domain/models/Employee'
// los repositories son para interfaces
// estas inferaces son para las funcienes que pueda ejecutar el usuario
export interface EmployeeRepository {
    findById(id:string): Promise < Employee | null>;
    findAll(): Promise <Employee[]>;
    create(employee: Employee): Promise<void>;
    update(employee: Employee): Promise<void>;
    delete(id: string): Promise <void>;
    // findByFilter(name?:string, position?:"junior" | "senior" | "teamLeader" | "ceo"): Promise <Employee[]>;
    // //modo profesor de findBYFilter
                    // Partial es un objeto en el que todo no es necesario 
    findByFilter(filter: Partial <{name: string; email: string}>): Promise<Employee[]>;
                                    //Estos corchetes podrian ser una interfaz filtro que creairias en la carpeta modelos "Filter" lo exportas y lo usas en estos casos por si cambias o añades más no tienes que cambiar en todos los archivos
}