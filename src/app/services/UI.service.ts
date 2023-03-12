import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, take, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UIService {
  private _dropdownMenuStatusSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  public readonly dropdownMenuStatus$: Observable<boolean> =
    this._dropdownMenuStatusSubject.asObservable();

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

  private _filterModalStatusSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  public readonly filterModalStatus$: Observable<boolean> =
    this._filterModalStatusSubject.asObservable();

  showFilterModal(): void {
    this._filterModalStatusSubject.next(true);
  }

  hideFilterModal(): void {
    this._filterModalStatusSubject.next(false);
  }

  resetUISettings(): void {
    this._filterModalStatusSubject.next(false);
    this._dropdownMenuStatusSubject.next(false);
  }
}
