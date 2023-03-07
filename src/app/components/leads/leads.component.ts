import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

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

  showMenu(value: boolean): void {
    this._dropdownMenuStatusSubject.next(value);
  }
}
