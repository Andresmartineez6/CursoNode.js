import { GetAllEmployees } from "application/use-cases/GetAllEmployees";
import { InMemoryUserRepo } from "infrastructure/repositories/inMemoryUserRepo";
import { Employee } from "domain/models/Employee";

describe("GetAllEmployees Use Case", () => {
  it("should get all employees correctly", async () => {
    const repo = new InMemoryUserRepo();
    const getAllEmployees = new GetAllEmployees(repo);
    
    // Crear empleados para la prueba
    const employee1 = new Employee(
      "test-id-1",
      "Manolo",
      "Manolez",
      "junior",
      2000,
      "27-7-2026",
      "team4",
      4
    );
    
    const employee2 = new Employee(
      "test-id-2",
      "Ana",
      "García",
      "senior",
      3500,
      "15-3-2027",
      "team2",
      7
    );
    
    await repo.create(employee1);
    await repo.create(employee2);
    
    // Ejecutar el caso de uso
    const employees = await getAllEmployees.execute();
    
    // Verificar que se obtuvieron todos los empleados
    expect(employees.length).toBe(2);
    expect(employees[0].getId()).toBe("test-id-1");
    expect(employees[1].getId()).toBe("test-id-2");
  });
  
  it("should return empty array when no employees exist", async () => {
    const repo = new InMemoryUserRepo();
    const getAllEmployees = new GetAllEmployees(repo);
    
    // Asegurar que el repositorio está vacío
    await repo.clear();
    
    // Ejecutar el caso de uso
    const employees = await getAllEmployees.execute();
    
    // Verificar que se devuelve un array vacío
    //El toEqual() sirve para tipos de datos mas complejos como arrays
    expect(employees).toEqual([]);
    expect(employees.length).toBe(0);
  });
});
