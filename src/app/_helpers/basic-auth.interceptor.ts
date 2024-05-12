import { Injectable, inject } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@environments/environment';
import { AuthenticationService } from '@app/_services/authentication.service';

@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {

    authenticationService: AuthenticationService =  inject(AuthenticationService)

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add header with basic auth credentials if user is logged in and request is to the api url
        const user = this.authenticationService.userValue;
        const isLoggedIn = user?.authdata;
        const isApiUrl = request.url.startsWith(environment.apiUrl);
        if (isLoggedIn && isApiUrl) {
            request = request.clone({
                setHeaders: { 
                    Authorization: `Basic ${user.authdata}`
                }
            });
        }

        return next.handle(request);
    }
}