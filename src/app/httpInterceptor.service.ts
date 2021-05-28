import {HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AuthService} from './components/login/auth.service';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService,
              private router: Router
  ) {
  }

  intercept(httpRequest: HttpRequest<any>, httpHandler: HttpHandler): Observable<HttpEvent<any>> {
    if (this.authService.isUserLoggedIn() && httpRequest.url.indexOf('login') === -1) {
      const authReq = httpRequest.clone({
        headers: new HttpHeaders({
          Authorization: this.authService.getJwtToken()
        })
      });
      return httpHandler.handle(authReq)
        .pipe(tap(() => {
          },
          (error: any) => {
            if (error.status === 401) {
              this.authService.logout();
              this.router.navigateByUrl('login');
            }
          }));
    } else {
      return httpHandler.handle(httpRequest);
    }
  }
}
