import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeDetails } from './../../data_models/employeeDetails.model';
import { DataService } from './../../services/data.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {

  employeeId: string;
  employeeDetails: any = {};
  editEmployeeForm: FormGroup;
  submitted: Boolean;

  constructor(
    private activatedRoute: ActivatedRoute,
    private _dataService: DataService,
    private _toasterService: ToastService,
    public formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.createEditEmployeeForm();
    this.employeeId = this.activatedRoute.snapshot.params['id'];
    this.getEmployeeDetails(this.employeeId);
  }

  getEmployeeDetails(employeeId) {
    this._dataService.getEmployee(employeeId)
      .subscribe((res) => {
        if (res['success'] == true) {
          this.employeeDetails = res.data;
          this.setEditEmployeeFormValue(res.data);
          this._toasterService.successToast("Done! received employee data successfully", 3000);
        } else {
          this._toasterService.errorToast("Error! something went wrong", 3000);
        }
      }, (error) => {
        console.log(error)
        this._toasterService.errorToast(error, 3000);
      })
  }

  createEditEmployeeForm() {
    this.editEmployeeForm = this.formBuilder.group({
      'name': ['', [Validators.required, Validators.maxLength(35), Validators.minLength(3)]],
      'email': ['', [Validators.required, Validators.email, Validators.maxLength(35), Validators.minLength(4)]],
      'phone': ['', [Validators.required, Validators.maxLength(13), Validators.minLength(6)]],
      'city': ['', [Validators.required, Validators.maxLength(15), Validators.minLength(2)]],
      'gender': ['', [Validators.required, Validators.maxLength(12)]],
      'status': ['', [Validators.required, Validators.maxLength(10)]],
      'designation': ['', [Validators.required, Validators.maxLength(35), Validators.minLength(2)]],
    })
  }

  setEditEmployeeFormValue(data) {
    let employeDetails = data;
    this.editEmployeeForm.patchValue({
      name: employeDetails['name'],
      email: employeDetails['email'],
      phone: employeDetails['phone'],
      city: employeDetails['city'],
      gender: employeDetails['gender'],
      status: employeDetails['status'],
      designation: employeDetails['designation']
    })
  }

  get editEmployeeFormValue() {
    return this.editEmployeeForm.value;
  }

  onSubmit() {
    if (!this.editEmployeeForm.valid) {
      this._toasterService.errorToast("Invalid Request. Please fill the form carefully", 3000)
      return false;
    }
    this.submitted = true;
    let employeeDetails: EmployeeDetails = this.editEmployeeFormValue;

    this._dataService.editEmployee(this.employeeId, employeeDetails)
      .subscribe((res) => {
        if (res.success == true) {
          this.employeeDetails = res.data;
          this.setEditEmployeeFormValue(res.data);
          this._toasterService.successToast(res.message, 3000);
          this.router.navigate(['/home']);
        }
      }, (error) => {
        console.log(error);
        this._toasterService.errorToast(error, 3000);
      })
  }

  reset() {
    this.editEmployeeForm.reset();
  }

  uploadImage(event: any) {
    if (!event.target.files[0]) {
      return false;
    }
    const file = event.target.files[0];
    const formData = new FormData()
    formData.append('file', file)

    this._dataService.imageUpload(this.employeeId, formData)
      .subscribe((res) => {
        if (res['success'] == true) {
          this.getEmployeeDetails(this.employeeId);
          this.router.navigate(['/home']);
        } else {
          this._toasterService.errorToast("Error! something went wrong", 3000);
        }
      }, (error) => {
        console.log(error);
        this._toasterService.errorToast(error, 3000);
      })

  }

  image(employeeDetails) {
    if (employeeDetails.imageUrl) {
      return employeeDetails.imageUrl;
    } else {
      let noImage = "../../../../../assets/employeeImage/no-profile-image.png";
      return noImage;
    }
  }


}
