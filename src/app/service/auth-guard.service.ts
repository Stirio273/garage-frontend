import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(
        private authService: AuthService,
        private router: Router
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        this.authService.handleAuthentication();
        if (this.authService.isConnected() == false) {
            this.router.navigate(['/auth/login']);
            return false;
        }
        const user = this.authService.currentUser();
        const requiredRole = route.data['role']; // Rôle requis

        if (user && (!requiredRole || user.role === requiredRole)) {
            return true;
        }

        // Redirection vers une page non autorisée
        this.router.navigate(['/auth/access']);
        return false;
    }
}
