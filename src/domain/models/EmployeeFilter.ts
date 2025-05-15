export interface EmployeeFilter{

  name: string,
  lastName: string,
  position: "junior" | "senior" | "teamLeader" | "ceo",
  salary: number,
  contractTermination : string,
  team : string,
  yearsOfService: number,
  
}
