import { CreateEmployee } from "application/use-cases/CreateEmployee";
import { InMemoryUserRepo } from "infrastructure/repositories/inMemoryUserRepo"

//estor recibe dos parametros
describe ("CreateEmployee Use Case", ()=>{
    //aqui especificas lo que deberia pasar 
    it("should create an emplyee correctly", async ()=>{
        //queremos probar el CreateEmployee.ts y que haga return correcto de Employee
        const repo = new InMemoryUserRepo();
        const createEmployee = new CreateEmployee(repo);

        const employee = await createEmployee.execute(null,"Manolo", "Manolez", "junior",2000, "27-7-2026", "team4", 4)

        //haces un expect de cada cosa que esperas obtener
        expect(employee.getName()).toBe("Manolo");
        expect(employee.getPosition()).toBe("junior")

        //haces un npm run test
    })
})
