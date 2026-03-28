import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Authentification } from '../../services/auth';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-login',
  standalone:true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: Authentification, private router: Router) 
  {
    this.loginForm = this.fb.group({
     email: [
      '',
      [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@uib\.com$/)
      ]
    ],
       password: [
      '',
      [
        Validators.required,
        Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&.#_])[A-Za-z\d@$!%*?&.#_]{8,}$/)
      ]
    ]
    });
  }


  /*onSubmit() {
    
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      if (this.authService.login(email, password)) {
        this.router.navigate(['/clients']); // redirection
      } else {
        alert('Email ou mot de passe incorrect');
      }
    }
  }*/
 onSubmit() {
    if (this.loginForm.valid) {
      const email = this.loginForm.value.email.trim();
      const password = this.loginForm.value.password.trim();

      this.authService.login(email, password).subscribe({
        next: (res:string) => {
          console.log('LOGIN SUCCESS', res); // 200
          localStorage.setItem('token', res);
          this.router.navigate(['/clients']);
        },
        error: (err) => {
          console.log('LOGIN ERROR', err.status); // 401
          alert('Email ou mot de passe incorrect');
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}



