import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  styleUrls: ['./login.component.css'],
  templateUrl: './login.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  readonly loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _cdr: ChangeDetectorRef
  ) {}

  onLoginFormSubmitted(loginForm: FormGroup): void {
    this._authService
      .login({
        email: loginForm.value.email,
        password: loginForm.value.password,
      })
      .subscribe({
        next: () => this._router.navigate(['/leads']),
        error: (e) => {
          this.loginForm.setErrors({ beValidator: e.error.message });
          this._cdr.detectChanges();
        },
      });
  }
}
