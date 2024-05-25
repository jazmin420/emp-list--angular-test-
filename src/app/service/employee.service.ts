import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../employee.model';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private serverUrl = "http://localhost:3000/employees"

  constructor(private http: HttpClient) { }

  addEmployee(employee: Employee) {
    return this.http.post(this.serverUrl, employee);
  }

  getEmployees() {
    return this.http.get<Employee[]>(this.serverUrl);
  }

  updateEmployees (employee: Employee){
    return this.http.put<Employee>(`${this.serverUrl}/${employee.id}`, employee)
  }
  

  deleteEmployee(id: string) {
    return this.http.delete<void>(`${this.serverUrl}/${id}`);
  }
  
  

}
