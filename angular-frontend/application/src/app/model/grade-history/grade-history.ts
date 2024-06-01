import { Employee } from "../employee/employee";

export class GradeHistory {
    id!: number;
    grade!: string;
    from_date!: string;
    to_date!: string;
    employee!: Employee;
}
