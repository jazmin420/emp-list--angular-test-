import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee.model';
import { EmployeeService } from '../service/employee.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {
  employee: Employee = new Employee();
  idError: string = '';

  constructor(private employeeService: EmployeeService,  private router: Router, private modalService: NgbModal) { }

  ngOnInit() {
    this.employee = new Employee();
  }


  logEmployee() {
    console.log(this.employee);
  }

  employees: Employee[] = [];

  
  isIdUnique(id: string): boolean {
    return !this.employees.some(employee => employee.id === id);
  }
  
  open(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }

  saveEmployee() {
    if (this.employee.id) {
      this.employeeService.addEmployee(this.employee).subscribe({
        next: () => {
          alert('Employee added successfully');
          this.employee = new Employee();
          this.idError = '';

          this.modalService.dismissAll(); 

          this.router.navigate(['/employees']);
        },
        error: (error) => {
          if (error.status === 500) {
            this.idError = 'ID is already taken';
          } else {
            this.idError = 'An error occurred';
          }
        }
      });
    }
  }
  
  
}
