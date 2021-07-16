import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Admin } from 'src/app/data_models/admin.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  //selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  changePasswordForm: FormGroup;

  constructor(public modal: NgbActiveModal, private _toasterService: ToastService, public formBuilder: FormBuilder, private _authService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
    this.createChangePasswordForm()
  }

  createChangePasswordForm() {
    this.changePasswordForm = this.formBuilder.group({
      'oldPassword': ['', [Validators.required, Validators.minLength(4)]],
      'newPassword': ['', [Validators.required, Validators.minLength(6)]],
      'confirmPassword': ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  get changePasswordFormValue() {
    return this.changePasswordForm.value;
  }

  onSubmit() {
    if (this.changePasswordForm.invalid) {
      return false;
    }
    let loginCredential: Admin = this.changePasswordFormValue;

    this._authService.login(loginCredential)
      .subscribe((res) => {
        if (res['success'] == true) {
          localStorage.setItem('token', res.data);
          this.router.navigate(['/home']);
        } else {
          this._toasterService.errorToast("Sorry! email or password not valid", 3000);
        }
      }, (error) => {
        this._toasterService.errorToast(error, 3000);
      })

  }

  reset() {
    this.changePasswordForm.reset();
  }

}
