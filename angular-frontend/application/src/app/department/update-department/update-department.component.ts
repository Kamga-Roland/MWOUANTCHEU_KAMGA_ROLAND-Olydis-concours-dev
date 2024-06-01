import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Department } from '../../model/department/department';
import { DepartmentService } from '../department.service';

@Component({
  selector: 'app-update-department',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './update-department.component.html',
  styleUrl: './update-department.component.css'
})
export class UpdateDepartmentComponent implements OnInit{

  id: number;

  department: Department = new Department;

  constructor(private departmentService: DepartmentService,
    private route: ActivatedRoute,
    private router: Router,) {
      this.id = this.route.snapshot.params['id'];
  }

  ngOnInit(): void{
    this.id = this.route.snapshot.params['id'];

    this.currentDepartmentData();
  }

  currentDepartmentData(){
    this.departmentService.getDepartmentById(this.id).subscribe({
      next: (data) => {
        this.department = data; // Populate the department object with the data received
        console.log(this.department)
      },
      error: (error) => {
        console.error('Error fetching department data:', error);
      }
    });
  }

  onSubmit() {
    this.departmentService.updateDepartment(this.id, this.department).subscribe({
      next: () => {
        console.log('Department update successful:');
        // Assuming goToDepartmentList is a method to navigate to the department list
        this.goToDepartmentList();
      },
      error: (error: any) => {
        console.error('There was an error updating the department:', error);
      }
    });
  }
  
  goToDepartmentList() {
    return this.router.navigate(['/departments']);
  }
}
