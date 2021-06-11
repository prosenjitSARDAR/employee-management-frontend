import { ToastService } from './../../services/toast.service';
import { Component, OnInit, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-toaster',
  templateUrl: './toaster.component.html',
  // styleUrls: ['./toaster.component.css']
  host: {'[class.ngb-toasts]': 'true'}
})
export class ToasterComponent implements OnInit {

  constructor(public toastService: ToastService) { }

  ngOnInit(): void {
  }

  isTemplate(toast) {
    return toast.textOrTpl instanceof TemplateRef;
  }

}
