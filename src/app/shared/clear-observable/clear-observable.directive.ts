import { Directive, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Directive()
export class ClearObservableDirective implements OnDestroy {
  destroy$ = new Subject<boolean>();
  constructor() {}
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
