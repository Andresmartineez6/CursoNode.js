import { Employee } from 'context/crud/domain/models/Employee';
import { EmployeeRepository } from 'context/crud/domain/repositories/EmployeeRepository';

export interface ResultadoPaginacion<T> {
    datos: T[];
    paginacion: {
        total: number;
        pagina: number;
        limite: number;
        totalPaginas: number;
    }
}

export class PaginateEmployees {
    constructor(private readonly employeeRepository: EmployeeRepository) {}

    async execute(pagina: number = 1, limite: number = 10): Promise<ResultadoPaginacion<Employee>> {
        // Validar parámetros de paginación
        const paginaValida = pagina > 0 ? pagina : 1;
        const limiteValido = limite > 0 ? (limite <= 100 ? limite : 100) : 10;
        
        // Obtener todos los empleados
        const todosEmpleados = await this.employeeRepository.findAll();
        
        // Calcular el total y las páginas
        const total = todosEmpleados.length;
        const totalPaginas = Math.ceil(total / limiteValido);
        
        // Calcular el índice de inicio y fin para la paginación
        const indiceInicio = (paginaValida - 1) * limiteValido;
        const indiceFin = Math.min(indiceInicio + limiteValido, total);
        
        // Obtener los datos paginados
        const datosPaginados = todosEmpleados.slice(indiceInicio, indiceFin);
        
        // Retornar el resultado con metadatos de paginación
        return {
            datos: datosPaginados,
            paginacion: {
                total,
                pagina: paginaValida,
                limite: limiteValido,
                totalPaginas
            }
        };

    }
    
}
