import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Department } from '../model/department/department';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  private baseURL = "http://localhost:8080/api/v1/departments";

  constructor(private httpClient: HttpClient) { }
  
  getDepartmentList(): Observable<Department[]> {
    return this.httpClient.get<Department[]>(`${this.baseURL}`)
  }
  
  createDepartment(department: Department): Observable<Object>{
    return this.httpClient.post(`${this.baseURL}`, department);
  }

  updateDepartment(id: number, department: Department): Observable<Object>{
    return this.httpClient.put(`${this.baseURL}/${id}`, department);
  }
  

  getDepartmentById(id: number): Observable<Department>{
    return this.httpClient.get<Department>(`${this.baseURL}/${id}`);
  }

  deleteDepartment(id: number): Observable<Object>{
    return this.httpClient.delete(`${this.baseURL}/${id}`);
  }


}
