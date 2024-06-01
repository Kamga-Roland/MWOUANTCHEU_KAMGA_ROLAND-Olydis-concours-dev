import { Department } from "../department/department";

export class Employee {
    id!: number;
    first_name!: string;
    last_name!: string;
    gender!: string;
    job_title!: string;
    contract_start_date!: string;
    contract_end_date!: string;
    department!: Department;
    manager!: Employee;

}
