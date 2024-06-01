import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Employee } from '../../model/employee/employee';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent implements OnInit{


  employees!: Employee[];

  // searchTerm: string = '';
  // searchResults: Employee[] = [];

  constructor(private employeeService: EmployeeService,
  private router: Router) {}

  ngOnInit(): void {
    this.getEmployees();
    // this.searchResults = [];
  }

  // searchEmployees() {
  //   if (this.searchTerm) {
  //     this.employeeService.searchEmployeesByFirstName(this.searchTerm)
  //       .subscribe({
  //         next: (employees: Employee[]) => {
  //           this.searchResults = employees;
  //         },
  //         error: (error) => {
  //           console.error('Error searching employees:', error);
  //         }
  //       });
  //   } else {
  //     // Handle empty search term (optional)
  //     console.log('Please enter a search term.');
  //   }
  // }

  private getEmployees() {
    this.employeeService.getEmployeesList().subscribe(data => {
      this.employees = data;
    })
  }

  updateEmployee(id: number){
    this.router.navigate(['update-employee', id])
  }

  employeeDetails(id: number){
    this.router.navigate(['employee-details', id]);
  }

  deleteEmployee(id: number){
    this.employeeService.deleteEmployee(id).subscribe( data => {
      console.log(data);
      this.getEmployees();
    })
  }
}
