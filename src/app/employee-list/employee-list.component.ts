import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee.model';
import { EmployeeService } from '../service/employee.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit 
{

  employees: Employee[] = [];

  selectedEmployee: Employee = new Employee();

  constructor(private employeeService: EmployeeService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees(): void {
    this.employeeService.getEmployees().subscribe((employees:Employee[]) => {
      this.employees = employees;
    });
  }

  selectEmployee(id: string): void {
    const employee = this.employees.find(employee => employee.id === id);
    if (employee) {
      this.selectedEmployee = employee;
    } else {
      console.error(`No employee found with id: ${id}`);
    }
  }
  
  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }


  updateEmployee(): void {
    this.employeeService.updateEmployees(this.selectedEmployee).subscribe(() => {
      alert('Employee updated successfully');
      this.modalService.dismissAll(); 
      this.selectedEmployee = new Employee();
      this.getEmployees();
    });
  }
  
  deleteEmployee(id: string): void {
    this.employeeService.deleteEmployee(id).subscribe(() => {
      alert('Employee deleted successfully');
      this.getEmployees();
    });
  }
  



}