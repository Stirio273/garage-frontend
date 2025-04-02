import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(
        private authService: AuthService,
        private router: Router
    ) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.authService.currentUser()?.token;
        let modifiedReq = req;
        if (token) {
            modifiedReq = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });
        }

        return next.handle(modifiedReq).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401) {
                    return this.authService.revokeToken().pipe(
                        switchMap((newToken) => {
                            if (newToken) {
                                const newRequest = req.clone({
                                    setHeaders: { Authorization: `Bearer ${newToken}` }
                                });
                                return next.handle(newRequest);
                            } else {
                                this.authService.logout();
                                this.router.navigate(['/auth/login']);
                                return throwError(() => error);
                            }
                        }),
                        catchError((refreshError) => {
                            this.authService.logout();
                            this.router.navigate(['/auth/login']);
                            return throwError(() => refreshError);
                        })
                    );
                }
                return throwError(() => error);
            })
        );
    }
}
