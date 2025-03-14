import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { AppFloatingConfigurator } from '../../../layout/component/app.floatingconfigurator';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { StepsModule } from 'primeng/steps';
import { PasswordModule } from 'primeng/password';
import { Router } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { AuthService } from '../../../service/auth.service';
import { User } from '../../../model/user';
import { Client } from '../../../model/client';
import { RowToggler } from 'primeng/table';

@Component({
    selector: 'app-inscription',
    standalone: true,
    imports: [CommonModule, FormsModule, ToastModule, PasswordModule, ButtonModule, InputTextModule, StepsModule],
    providers: [MessageService],
    templateUrl: './inscription.component.html',
    styleUrl: './inscription.component.scss'
})
export class InscriptionComponent implements OnInit {
    constructor(
        private router: Router,
        private auth: AuthService
    ) {}

    ngOnInit(): void {}

    onSubmitForm(form: NgForm): void {
        if (form.valid) {
            console.log(form.value);
            const customer: Client = {
                name: form.value.name,
                firstName: form.value.firstName,
                email: form.value.email,
                password: form.value.password,
                phoneNumber: form.value.phone,
                role: 'client'
            };
            this.auth.signUp(customer).subscribe({
                next: (response) => {
                    console.log(response);
                    this.auth.signIn(form.value.email, form.value.password).subscribe({
                        next: () => {
                            console.log('Logged in successfully');
                            this.auth.redirectUser();
                        }
                    });
                },
                error: (error) => {
                    console.log(error);
                }
            });
        }
    }

    navigateToLogin() {
        this.router.navigate(['/auth/login']);
    }
}
