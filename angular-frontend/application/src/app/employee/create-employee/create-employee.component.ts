import { Component, OnInit } from '@angular/core';
import { Employee } from '../../model/employee/employee';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { Department } from '../../model/department/department';
import { DepartmentService } from '../../department/department.service';
import { Gender } from '../../model/employee/gender';

@Component({
  selector: 'app-create-employee',
  standalone: true,
  imports: [FormsModule, NgFor],
  templateUrl: './create-employee.component.html',
  styleUrl: './create-employee.component.css'
})
export class CreateEmployeeComponent implements OnInit{

  gender = Gender;
  
  employee: Employee = new Employee;

  departments: Department[] = []; // property to  store department data


  constructor(private employeeService: EmployeeService,
    private departmentService: DepartmentService,
    private router: Router) {}

  ngOnInit(): void {
    this.getDepartments();
  }

  saveEmployee() {
    if (!this.employee.department) {
      console.log("Choose a department for your employee");
      return; // Exit the function if no department selected
    }
  
    const departmentId = this.employee.department.id; // Extract department ID
  
    this.employeeService.createEmployee(this.employee).subscribe({
      next: (data: any) => {
        console.log(data);
        this.goToEmployeeList();
      },
      error: (error) => {
        console.error('Error creating employee:', error);
      }
    });
  }
  

  goToEmployeeList(){
    this.router.navigate(['/employees']);
  }
  
  onSubmit(){
    console.log(this.employee);
    this.saveEmployee();
  }

  // service for fetching de[aerment data
  getDepartments() {
    this.departmentService.getDepartmentList().subscribe({
      next: (departments: Department[]) => {
        this.departments = departments;
        console.log('Departments retrieved:', this.departments);
      },
      error: (error: any) => {
        console.log('Error fetching departments:', error);
      }
    });
  }


}
