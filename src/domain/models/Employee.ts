
//el export es porque vas a exportar la clase a otros archivos
export class Employee {
    private readonly id: string
    private name: string
    private lastName: string
    private position: "junior" | "senior" | "teamLeader" | "ceo"
    private salary: number
    private contractTermination : string
    private team : string
    private yearsOfService: number

    
    constructor(
        id: string,
        name: string,
        lastName: string,
        position: "junior" | "senior" | "teamLeader" | "ceo",
        salary: number,
        contractTermination : string,
        team : string,
        yearsOfService: number){

            this.id= id;
            this.name = name;
            this.lastName = lastName;
            this.position = position;
            this.salary = salary;
            this.contractTermination = contractTermination;
            this.team = team;
            this.yearsOfService = yearsOfService;

    }

    public changeSalary(newSalary : number):void{
        this.salary = newSalary
    }

    public changePosition (newPosition : "junior" | "senior" | "teamLeader" | "ceo"): void{
        this.position = newPosition
    }

    public getId(): string{
        return this.id
    }

    public getName(): string{
        return this.name
    }

    public getPosition(): string{
        return this.position
    }
}