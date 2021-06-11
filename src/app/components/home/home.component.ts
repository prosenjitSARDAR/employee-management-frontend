import { ModalService } from './../../services/modal.service';
import { ToastService } from './../../services/toast.service';
import { EmployeeDetails } from '../../data_models/employeeDetails.model';
import { DataService } from './../../services/data.service';
import { AddEmployee } from './../../data_models/addEmployee.model';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { DatePipe, TitleCasePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild('closeButton') closeButton: ElementRef;

  addEmployeeForm: FormGroup;
  submitted: Boolean = false;
  allEmployees: EmployeeDetails[] = [];
  searchKeyword: string = "";

  constructor(
    public formBuilder: FormBuilder,
    private _dataService: DataService,
    private _toasterService: ToastService,
    private _modalService: ModalService,
    private router: Router
  ) {
    this.createAddEmployeeForm();
  }

  ngOnInit(): void {
    this.getAllEmployees();
  }

  getAllEmployees() {
    this._dataService.getAllEmployees()
      .subscribe((res) => {
        if (res.success === true) {
          this.allEmployees = res.data;
          if (res['data'].length) {
            this._toasterService.successToast(res['message'], 3000);
          } else {
            this._toasterService.successToast("No employee data available", 3000);
          }
        }
      }, (error) => {
        this._toasterService.errorToast(error, 3000);
      })
  }
  viewEmployeeDetails(employee) {
    this._modalService.detailsModal(employee);
  }
  deleteEmployee(employee_id, employee_name) {
    this._modalService.employeeDeleteModal(employee_id, employee_name);

    this._modalService.employeeDeleteModalValue$
      .subscribe((res) => {
        if (res == true) {
          this.getAllEmployees();
          this._toasterService.successToast("Done! employee has been removed", 3000);
        } else {
          this._toasterService.errorToast("Error! something went wrong", 3000);
        }
      }, (error) => {
        this._toasterService.errorToast("Error! something went wrong", 3000);
      })
  }
  createAddEmployeeForm() {
    this.addEmployeeForm = this.formBuilder.group({
      'name': ['', [Validators.required, Validators.maxLength(35), Validators.minLength(3)]],
      'email': ['', [Validators.required, Validators.email, Validators.maxLength(35), Validators.minLength(4)]],
      'phone': ['', [Validators.required, Validators.maxLength(13), Validators.minLength(6)]],
      'city': ['', [Validators.required, Validators.maxLength(15), Validators.minLength(2)]],
      'gender': ['', [Validators.required, Validators.maxLength(12)]],
      'status': ['', [Validators.required, Validators.maxLength(10)]],
      'designation': ['', [Validators.required, Validators.maxLength(35), Validators.minLength(2)]],
    })
  }

  get addEmployeeFormValue() {
    return this.addEmployeeForm.value;
  }
  get myForm() {
    return this.addEmployeeForm.controls;
  }
  reset() {
    this.addEmployeeForm.reset();
  }

  onSubmit() {
    if (!this.addEmployeeForm.valid) {
      return false;
    }
    this.submitted = true;
    let employeeDetails: AddEmployee = this.addEmployeeFormValue;

    this._dataService.createEmployee(employeeDetails)
      .subscribe((res) => {
        this.closeButton.nativeElement.click();
        if (res['success'] == true) {
          this.getAllEmployees();
          this._toasterService.successToast("Done! Employee has been added", 3000);
        }
      }, (error) => {
        this.closeButton.nativeElement.click();
        this._toasterService.errorToast("Error! something went wrong", 3000);
      })

    this.reset();
  }

  image(employee) {
    if (employee.imageUrl) {
      return employee.imageUrl;
    } else {
      let noImage = "../../../../../assets/employeeImage/no-profile-image.png";
      return noImage;
    }
  }


}
