import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public _authService: AuthenticationService, private _modalService: ModalService) { }

  ngOnInit(): void {
  }

  openChangePasswordModal() {
    this._modalService.changePasswordModal();
  }

}
