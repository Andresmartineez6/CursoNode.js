/* eslint-disable @typescript-eslint/no-explicit-any */
import { Employee } from 'context/crud/domain/models/Employee';
import { EmployeeRepository } from 'context/crud/domain/repositories/EmployeeRepository';



export type SortField = 'name' | 'lastName' | 'position' | 'salary' | 'yearsOfService';
export type SortOrder = 'asc' | 'desc';

export class SortEmployees {
    constructor(private readonly employeeRepository: EmployeeRepository) {}

    async execute(
        sortField: SortField = 'name',
        sortOrder: SortOrder = 'asc'
    ): Promise<Employee[]> {
        // Obtener todos los empleados
        const employees = await this.employeeRepository.findAll();
        
        if (!employees || employees.length === 0) {
            return [];
        }

        // Definir una función para obtener el valor del campo por el que ordenar
        const getFieldValue = (employee: Employee, field: SortField): any => {
            switch (field) {
                case 'name':
                    return employee.getName();
                case 'lastName':
                    return employee.getLastName();
                case 'position':
                    return employee.getPosition();
                case 'salary':
                    return employee.getSalary();
                case 'yearsOfService':
                    return employee.getYearsOfService();
                default:
                    return employee.getName();
            }
        };

        // Ordenar los empleados según el campo y orden especificados
        return [...employees].sort((a, b) => {
            const valueA = getFieldValue(a, sortField);
            const valueB = getFieldValue(b, sortField);

            // Ordenar según el tipo de dato
            if (typeof valueA === 'string' && typeof valueB === 'string') {
                return sortOrder === 'asc' 
                    ? valueA.localeCompare(valueB) 
                    : valueB.localeCompare(valueA);
            } else {
                // Para valores numéricos
                return sortOrder === 'asc' 
                    ? valueA - valueB 
                    : valueB - valueA;
            }
        });
    }
}
