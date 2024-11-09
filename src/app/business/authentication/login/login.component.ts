import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginRequest } from '../../../models/login.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export default class LoginComponent {
  loginForm : FormGroup;
  loginError:string="";

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  login() {
    if(this.loginForm.valid){
      this.loginError="";
      const loginRequest: LoginRequest = this.loginForm.value;
      this.authService.login(loginRequest).subscribe({
        next: () => this.router.navigate(['/sleep-detector']),
        error: (err) => {
          console.error('Login error', err);
          this.loginError = err;
          this.password?.reset();
        },
        complete: () => {
          console.log('Login complete');
          this.loginForm.reset();
        }
      });
    }
    else {
      this.loginForm.markAllAsTouched();
      alert("Error al ingresar los datos.");
    }
  }
}
