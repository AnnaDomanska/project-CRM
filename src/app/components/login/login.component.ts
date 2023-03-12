import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from '../../services/auth.service';
import { switchMap } from 'rxjs';

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
    remember: new FormControl(true),
  });

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _cdr: ChangeDetectorRef,
    private _userService: UserService
  ) {}

  onLoginFormSubmitted(loginForm: FormGroup): void {
    if (!loginForm.valid) {
      return alert('You should complete the entire form!');
    }
    this._authService
      .login(
        {
          email: loginForm.value.email,
          password: loginForm.value.password,
        },
        loginForm.value.remember
      )
      .pipe(switchMap(() => this._userService.getUserData()))
      .subscribe({
        next: () => this._router.navigate(['/leads']),
        error: (e) => {
          this.loginForm.setErrors({ beValidator: e.error.message });
          this._cdr.detectChanges();
        },
      });
  }
}
