import { Component } from '@angular/core';
import { Department } from '../../model/department/department';
import { DepartmentService } from '../department.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-department-details',
  standalone: true,
  imports: [],
  templateUrl: './department-details.component.html',
  styleUrl: './department-details.component.css'
})
export class DepartmentDetailsComponent {

  id: number;

  department: Department = new Department;

  constructor(private departmentService: DepartmentService, 
    private router: Router, 
    private route: ActivatedRoute) {
      this.id = this.route.snapshot.params['id'];
    }

    ngOnInit(): void {
      this.id = this.route.snapshot.params['id'];
      this.departmentDetails();
    }

    departmentDetails(){
      this.id = this.route.snapshot.params['id'];

      this.departmentService.getDepartmentById(this.id).subscribe({
        next: (data: any) => {
          this.department = data
          console.log(this.department)
        },
        error: (error) => {
          console.log(error)
        }
      })
    }
}
