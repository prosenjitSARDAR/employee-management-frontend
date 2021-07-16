import { Injectable } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

/* Change password Modal */
import { ChangePasswordComponent } from '../modals/change-password/change-password.component';

/* Details modal */
import { DetailsModalComponent } from './../modals/details-modal/details-modal.component';

/* employee Delete Modal */
import { EmployeeDeleteModalComponent } from './../modals/employee-delete-modal/employee-delete-modal.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  //Add New Shipping Item
  private employeeDeleteModalValue: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  employeeDeleteModalValue$ = this.employeeDeleteModalValue.asObservable();

  constructor(config: NgbModalConfig, private modalService: NgbModal) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  changePasswordModal() {
    const modalRef = this.modalService.open(ChangePasswordComponent, { size: 'lg', backdrop: 'static', centered: true });
    return modalRef;
  }

  detailsModal(employee) {
    const modalRef = this.modalService.open(DetailsModalComponent, { size: 'lg', backdrop: 'static', centered: true });
    modalRef.componentInstance.employee = employee;
    return modalRef;
  }

  employeeDeleteModal(employee_id, employee_name) {
    const modalRef = this.modalService.open(EmployeeDeleteModalComponent, { size: 'sm', backdrop: 'static', centered: true });
    modalRef.componentInstance.employee_id = employee_id;
    modalRef.componentInstance.employee_name = employee_name;
    return modalRef;
  }
  /* employeeDeleteModal value Comming to this unction and going to employeeDeleteModalValue*/
  employeeDeleteValue(data) {
    this.employeeDeleteModalValue.next(data);
  }






}
