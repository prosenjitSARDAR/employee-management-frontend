import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TitleCasePipe } from '@angular/common';

@Component({
  //selector: 'app-details-modal',
  templateUrl: './details-modal.component.html',
  styleUrls: ['./details-modal.component.css']
})
export class DetailsModalComponent implements OnInit {

  @Input() employee;

  constructor(public modal: NgbActiveModal) { }

  ngOnInit(): void {
  }


  image(employee) {
    if (employee.imageUrl) {
      return employee.imageUrl;
    } else {
      let noImage = "../../../assets/employeeImage/no-profile-image.png";
      return noImage
    }
  }

}
