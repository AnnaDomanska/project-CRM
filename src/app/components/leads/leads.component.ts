import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LeadModel } from '../../models/lead.model';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { LeadsService } from '../../services/leads.service';

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

  readonly userEmail$: Observable<string> = this._userService
    .getUserData()
    .pipe(map((data) => data.email));

  readonly leads$: Observable<LeadModel[]> = this._leadsService.getLeads();

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _userService: UserService,
    private _leadsService: LeadsService
  ) {}

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
