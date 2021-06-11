import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  show: boolean = false;
  toasts: any = {};

  constructor() { }

  /* toast */
  private showToast(textOrTpl: string, options: any = {}) {
    this.toasts = { textOrTpl, ...options }
    this.show = true;
  }

  public removeToast() {
    this.toasts = {}
    this.show = false;
  }

  successToast(message: string, time: number) {
    this.showToast(message, { classname: 'bg-success text-light', delay: time })
  }

  errorToast(message: string, time: number) {
    this.showToast(message, { classname: 'bg-danger text-light', delay: time })
  }
  /* end toast */
}
