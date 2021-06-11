import { ModalService } from './../../services/modal.service';
import { DataService } from './../../services/data.service';
import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TitleCasePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  //selector: 'app-employee-delete-modal',
  templateUrl: './employee-delete-modal.component.html',
  styleUrls: ['./employee-delete-modal.component.css']
})
export class EmployeeDeleteModalComponent implements OnInit {

  @Input() employee_id;
  @Input() employee_name;

  constructor(
    public modal: NgbActiveModal,
    private _dataService: DataService,
    private router: Router,
    public _modalService: ModalService
  ) { }

  ngOnInit(): void {
  }

  deleteEmployee() {
    let employeeId = this.employee_id;
    let data: boolean = null;

    this._dataService.deleteEmployee(employeeId)
      .subscribe((res) => {
        if (res['success'] == true) {
          this._modalService.employeeDeleteValue(true);
        } else {
          this._modalService.employeeDeleteValue(false);
        }
      }, (error) => {
        this._modalService.employeeDeleteValue(false);
      })

    this.modal.close();
  }

}
