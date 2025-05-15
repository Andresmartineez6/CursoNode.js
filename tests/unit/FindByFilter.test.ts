import { FindByFilter } from "application/use-cases/FindByFilter";
import { InMemoryUserRepo } from "infrastructure/repositories/inMemoryUserRepo";
import { Employee } from "domain/models/Employee";

describe("FindByFilter Use Case", () => {
  let repo: InMemoryUserRepo;
  let findByFilter: FindByFilter;

  beforeEach(async () => {
    repo = new InMemoryUserRepo();
    findByFilter = new FindByFilter(repo);
    
    // Crear empleados para las pruebas
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
    
    const employee3 = new Employee(
      "test-id-3",
      "Carlos",
      "Rodríguez",
      "junior",
      2200,
      "10-5-2025",
      "team4",
      2
    );
    
    await repo.create(employee1);
    await repo.create(employee2);
    await repo.create(employee3);
  });
  
  it("should find employees by name filter", async () => {
    // Filtrar por nombre
    const employees = await findByFilter.execute({ name: "Ana" });
    
    // Verificar que se encontró el empleado correcto
    expect(employees.length).toBe(1);
    expect(employees[0].getId()).toBe("test-id-2");
    expect(employees[0].getName()).toBe("Ana");
  });
  
  it("should find employees by position filter", async () => {
    // Filtrar por posición
    const employees = await findByFilter.execute({ position: "junior" });
    
    // Verificar que se encontraron los empleados correctos
    expect(employees.length).toBe(2);
    expect(employees[0].getPosition()).toBe("junior");
    expect(employees[1].getPosition()).toBe("junior");
  });
  
  it("should find employees by name and position filter", async () => {
    // Filtrar por nombre y posición
    const employees = await findByFilter.execute({ name: "Manolo", position: "junior" });
    
    // Verificar que se encontró el empleado correcto
    expect(employees.length).toBe(1);
    expect(employees[0].getId()).toBe("test-id-1");
    expect(employees[0].getName()).toBe("Manolo");
    expect(employees[0].getPosition()).toBe("junior");
  });
  
  it("should return all employees when no filter is provided", async () => {
    // No proporcionar filtro
    const employees = await findByFilter.execute({});
    
    // Verificar que se devuelven todos los empleados
    expect(employees.length).toBe(3);
  });
  
  it("should return empty array when no employees match the filter", async () => {
    // Proporcionar un filtro que no coincide con ningún empleado
    const employees = await findByFilter.execute({ name: "Inexistente" });
    
    // Verificar que se devuelve un array vacío
    expect(employees.length).toBe(0);
  });
});
