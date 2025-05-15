import { DeleteEmployee } from 'application/use-cases/DeleteEmployee';
import { InMemoryUserRepo } from 'infrastructure/repositories/inMemoryUserRepo';
import { Employee } from 'domain/models/Employee';

describe('DeleteEmployee Use Case', () => {
  it('should delete an employee correctly', async () => {
    const repo = new InMemoryUserRepo();
    const deleteEmployee = new DeleteEmployee(repo);

    // Crear un empleado para eliminar
    const testEmployee = new Employee(
      'test-id-123',
      'Manolo',
      'Manolez',
      'junior',
      2000,
      '27-7-2026',
      'team4',
      4,
    );

    await repo.create(testEmployee);

    // Verificar que el empleado existe antes de eliminarlo
    let employees = await repo.findAll();
    expect(employees.length).toBe(1);

    // Ejecutar el caso de uso para eliminar el empleado
    await deleteEmployee.execute('test-id-123');

    // Verificar que el empleado fue eliminado
    employees = await repo.findAll();
    expect(employees.length).toBe(0);
  });

  it('should throw an error when trying to delete a non-existent employee', async () => {
    const repo = new InMemoryUserRepo();
    const deleteEmployee = new DeleteEmployee(repo);

    // Intentar eliminar un empleado que no existe
    await expect(deleteEmployee.execute('non-existent-id')).rejects.toThrow(
      'User not found',
    );
  });
});
