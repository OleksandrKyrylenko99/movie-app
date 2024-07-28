import { Directive, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Directive()
export class ClearObservableDirective implements OnDestroy {
  destroy$ = new Subject<boolean>();
  constructor() {}
  ngOnDestroy(): void {
    if (this.destroy$) {
      this.destroy$.next(true);
      this.destroy$.complete();
    }
  }
}
