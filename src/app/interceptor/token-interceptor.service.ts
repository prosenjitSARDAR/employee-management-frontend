import { AuthenticationService } from './../services/authentication.service';
import { HttpInterceptor } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private injector: Injector) { }

  intercept(req, next) {
    let authService = this.injector.get(AuthenticationService)

    let tokenizedReq = req.clone({
      setHeaders: {
        authorization: `${authService.getToken()}`
      }
    })

    return next.handle(tokenizedReq)

  }






}
