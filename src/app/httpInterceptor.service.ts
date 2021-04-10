import {HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AuthService} from './components/login/auth.service';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService) {
  }

  intercept(httpRequest: HttpRequest<any>, httpHandler: HttpHandler): Observable<HttpEvent<any>> {
    if (this.authService.isUserLoggedIn() && httpRequest.url.indexOf('login') === -1) {
      const authReq = httpRequest.clone({
        headers: new HttpHeaders({
          Authorization: this.authService.getBasicAuth()
        })
      });
      return httpHandler.handle(authReq);
    } else {
      return httpHandler.handle(httpRequest);
    }
  }
}
