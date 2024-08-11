import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { platform } from 'os';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  isAuth: BehaviorSubject<any> = new BehaviorSubject(null)
  isBrowser: Boolean = false
  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(PLATFORM_ID)
  }

  tokenStatus() {
    if (typeof window != 'undefined' && window.sessionStorage) {
      this.isAuth.next(true)
      return true
    }
    this.isAuth.next(false)
    return false
  }
}
