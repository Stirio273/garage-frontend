import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { AppFloatingConfigurator } from '../../layout/component/app.floatingconfigurator';
import { AuthService } from '../../service/auth.service';
import { ProfilType } from '../../model/profil-type.type';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [ButtonModule, CheckboxModule, InputTextModule, PasswordModule, FormsModule, RouterModule, RippleModule, AppFloatingConfigurator],
    template: `
        <app-floating-configurator />
        <div class="bg-surface-50 dark:bg-surface-950 flex items-center justify-center min-h-screen min-w-[100vw] overflow-hidden">
            <div class="flex flex-col items-center justify-center">
                <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
                    <div class="w-full bg-surface-0 dark:bg-surface-900 py-20 px-8 sm:px-20" style="border-radius: 53px">
                        <div class="text-center mb-8">
                            <div class="text-surface-900 dark:text-surface-0 text-3xl font-medium mb-4">Bienvenue sur REVAUTO</div>
                            <span class="text-muted-color font-medium">Se connecter pour continuer</span>
                        </div>

                        <div>
                            <label for="email1" class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2">Email</label>
                            <input pInputText id="email1" type="text" class="w-full md:w-[30rem] mb-8" [(ngModel)]="email" />

                            <label for="password1" class="block text-surface-900 dark:text-surface-0 font-medium text-xl mb-2">Mot de passe</label>
                            <p-password id="password1" [(ngModel)]="password" [toggleMask]="true" styleClass="mb-4" [fluid]="true" [feedback]="false"></p-password>

                            <div class="flex items-center justify-between mt-2 mb-8 gap-8">
                                <div class="flex items-center">
                                    <p-checkbox [(ngModel)]="checked" id="rememberme1" binary class="mr-2"></p-checkbox>
                                    <label for="rememberme1">Se souvenir de moi</label>
                                </div>
                                <span class="font-medium no-underline ml-2 text-right cursor-pointer text-primary">Mot de passe oublié?</span>
                            </div>
                            <p-button label="Se connecter" styleClass="w-full" (onClick)="onSubmit()"></p-button>

                            <div class="flex items-center my-4">
                                <hr class="flex-grow border-t border-gray-300 dark:border-gray-600" />
                                <span class="mx-4 text-gray-500 dark:text-gray-400 font-medium">ou</span>
                                <hr class="flex-grow border-t border-gray-300 dark:border-gray-600" />
                            </div>

                            <div class="text-center">
                                <p-button label="Créer un compte" styleClass="p-button-link text-primary" (onClick)="navigateToSignup()"></p-button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
})
export class Login {
    email: string = 'manager@gmail.com';

    password: string = 'password';

    checked: boolean = false;

    constructor(
        private authService: AuthService,
        private router: Router
    ) {}

    onSubmit(): void {
        console.log('Logging in...');
        this.authService.signIn(this.email, this.password).subscribe({
            next: () => {
                console.log('Logged in successfully');
                this.authService.redirectUser();
            },
            error: (error) => {
                console.error('Login failed', error);
            }
        });
    }

    navigateToSignup(): void {
        this.router.navigateByUrl('/auth/inscription');
    }
}
