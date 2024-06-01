import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { Department } from '../../model/department/department';
import { DepartmentService } from '../department.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-department-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './department-list.component.html',
  styleUrl: './department-list.component.css'
})
export class DepartmentListComponent implements OnInit {

  departments!: Department[];

  constructor(private departmentService: DepartmentService,
  private router: Router) {}

  ngOnInit(): void {
    this.getDepartments();
  }

  private getDepartments() {
    this.departmentService.getDepartmentList().subscribe(data => {
      this.departments = data;
    })
  }

  updateDepartment(id: number){
    this.router.navigate(['update-department', id])
  }

  departmentDetails(id: number){
    this.router.navigate(['department-details', id]);
  }

  deleteDepartment(id: number){
    this.departmentService.deleteDepartment(id).subscribe( data => {
      console.log(data);
      this.getDepartments();
    })
  }
}
