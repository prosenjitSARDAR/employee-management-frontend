import { Router } from '@angular/router';
import { AuthenticationService } from './../../services/authentication.service';
import { Admin } from './../../data_models/admin.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private _authService: AuthenticationService,
    private router: Router,
    private _toasterService: ToastService
  ) { }

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      'email': ['', [Validators.required, Validators.email, Validators.maxLength(35), Validators.minLength(4)]],
      'password': ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  get loginFormValue() {
    return this.loginForm.value;
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return false;
    }
    let loginCredential: Admin = this.loginFormValue;

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
    this.loginForm.reset();
  }



}
