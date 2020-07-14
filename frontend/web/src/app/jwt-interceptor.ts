import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = localStorage.getItem("token");
    let authReq = req;
    if(token !== null) {
        authReq = req.clone({
            headers: req.headers.set('Authorization', token)
        });
    }
    return next.handle(authReq);
  }
}