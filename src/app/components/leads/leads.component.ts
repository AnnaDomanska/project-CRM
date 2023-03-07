import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { BehaviorSubject, Observable, take, map } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-leads',
  styleUrls: ['./leads.component.scss'],
  templateUrl: './leads.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LeadsComponent {
  private _dropdownMenuStatusSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  public dropdownMenuStatus$: Observable<boolean> =
    this._dropdownMenuStatusSubject.asObservable();

  constructor(private _authService: AuthService, private _router: Router) {}

  showMenu(): void {
    this.dropdownMenuStatus$
      .pipe(
        take(1),
        map((actualStatus) =>
          this._dropdownMenuStatusSubject.next(!actualStatus)
        )
      )
      .subscribe();
  }

  logout(): void {
    this._authService.logout();
    this._router.navigate(['logged-out']);
  }
}
