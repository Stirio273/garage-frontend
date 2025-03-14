import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from './app/service/auth.service';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterModule],
    template: `<router-outlet></router-outlet>`
})
export class AppComponent {
    constructor(public auth: AuthService) {
        // auth.handleAuthentication();
    }
}
