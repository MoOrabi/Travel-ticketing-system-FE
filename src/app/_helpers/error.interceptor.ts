import { Injectable, inject } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from '@app/_services/authentication.service';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    
    authenticationService: AuthenticationService =  inject(AuthenticationService)

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if ([401, 403].includes(err.status)) {
                // auto logout if 401 response returned from api
                this.authenticationService.logout();
            }

            const error = err.error?.body || err.statusText;
            return throwError(() => error);
        }))
    }
}