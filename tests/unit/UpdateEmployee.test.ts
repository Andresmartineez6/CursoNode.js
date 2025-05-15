import { UpdateEmployee } from "application/use-cases/UpdateEmployee";
import { InMemoryUserRepo } from "infrastructure/repositories/inMemoryUserRepo";
import { Employee } from "domain/models/Employee";

describe("UpdateEmployee Use Case", () => {
  it("should update an employee correctly", async () => {
    const repo = new InMemoryUserRepo();
    const updateEmployee = new UpdateEmployee(repo);
    
    // Crear un empleado para actualizar
    const testEmployee = new Employee(
      "test-id-123",
      "Manolo",
      "Manolez",
      "junior",
      2000,
      "27-7-2026",
      "team4",
      4
    );
    
    await repo.create(testEmployee);
    
    // Ejecutar el caso de uso para actualizar el empleado
    const updatedEmployee = await updateEmployee.execute(
      "test-id-123", 
      "senior", 
      3000
    );
    
    // Verificar que el empleado fue actualizado correctamente
    expect(updatedEmployee.getId()).toBe("test-id-123");
    expect(updatedEmployee.getPosition()).toBe("senior");
    
    // Verificar que el empleado fue actualizado en el repositorio
    const employeeFromRepo = await repo.findById("test-id-123");
    expect(employeeFromRepo?.getPosition()).toBe("senior");
  });
  
  it("should throw an error when trying to update a non-existent employee", async () => {
    const repo = new InMemoryUserRepo();
    const updateEmployee = new UpdateEmployee(repo);
    
    // Intentar actualizar un empleado que no existe
    await expect(updateEmployee.execute("non-existent-id", "senior", 3000)).rejects.toThrow("User not found");
  });
});
