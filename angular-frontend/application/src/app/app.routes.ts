import { Routes } from '@angular/router';
import { EmployeeListComponent } from './employee/employee-list/employee-list.component';
import { CreateEmployeeComponent } from './employee/create-employee/create-employee.component';
import { UpdateEmployeeComponent } from './employee/update-employee/update-employee.component';
import { EmployeeDetailsComponent } from './employee/employee-details/employee-details.component';
import { CreateDepartmentComponent } from './department/create-department/create-department.component';
import { DepartmentListComponent } from './department/department-list/department-list.component';
import { UpdateDepartmentComponent } from './department/update-department/update-department.component';
import { DepartmentDetailsComponent } from './department/department-details/department-details.component';

export const routes: Routes = [
    {path: '', redirectTo: 'employees', pathMatch: 'full'},
    {path: 'employees', component: EmployeeListComponent},
    {path: 'create-employee', component: CreateEmployeeComponent},
    {path: 'update-employee/:id', component: UpdateEmployeeComponent},
    {path: 'employee-details/:id', component: EmployeeDetailsComponent},

    {path: 'departments', component: DepartmentListComponent},
    {path: 'create-department', component: CreateDepartmentComponent},
    {path: 'update-department/:id', component: UpdateDepartmentComponent},
    {path: 'department-details/:id', component: DepartmentDetailsComponent},

];
