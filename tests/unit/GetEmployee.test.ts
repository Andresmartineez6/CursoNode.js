import { GetEmployee } from 'context/crud/application/use-cases/GetEmployee';
import { InMemoryUserRepo } from 'context/crud/infrastructure/repositories/inMemoryUserRepo';
import { Employee } from 'context/crud/domain/models/Employee';

describe('GetEmployee Use Case', () => {
  it('should get an employee by id correctly', async () => {
    const repo = new InMemoryUserRepo();
    const getEmployee = new GetEmployee(repo);

    // Crear un empleado para buscar
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

    // Ejecutar el caso de uso
    const employee = await getEmployee.execute('test-id-123');

    // Verificar que se obtuvo el empleado correcto
    expect(employee.getId()).toBe('test-id-123');
    expect(employee.getName()).toBe('Manolo');
    expect(employee.getPosition()).toBe('junior');
  });

  it('should throw an error when employee is not found', async () => {
    const repo = new InMemoryUserRepo();
    const getEmployee = new GetEmployee(repo);

    // Intentar obtener un empleado que no existe
    await expect(getEmployee.execute('non-existent-id')).rejects.toThrow(
      'User not found',
    );
  });
});
