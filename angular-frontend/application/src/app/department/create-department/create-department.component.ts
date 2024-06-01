import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Department } from '../../model/department/department';
import { DepartmentService } from '../department.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-department',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-department.component.html',
  styleUrl: './create-department.component.css'
})
export class CreateDepartmentComponent implements OnInit {

  department: Department = new Department;

  constructor(private departmentService: DepartmentService,
    private router: Router) {}
  
  ngOnInit(): void {}

  saveDepartment(){
    this.departmentService.createDepartment(this.department).subscribe({
      next: (data: any) => {
        console.log(data);
        this.goToDepartmentList();
      },
      error: (error: any) => {
        console.log(error);
      }
    });    
  }

  goToDepartmentList(){
    this.router.navigate(['/departments']);
  }
  
  onSubmit(){
    console.log(this.department);
    this.saveDepartment();
  }
}
