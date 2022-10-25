import {Inject, Injectable, InjectionToken, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from "@angular/common";


@Injectable({
  providedIn: 'root'
})
export class CookiesService {
  cookiesAccepted!: boolean;
  private readonly isBrowser: boolean;

  constructor(
    @Inject(PLATFORM_ID) private platformId: InjectionToken<Object>
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    if (this.isBrowser) {
      this.cookiesAccepted = true;
    }
  }

  acceptCookies(): void {
    this.setElement('useCookies', 'true', true);
  }

  getElementById(key: string): string | null {
    if (this.isBrowser) {
      return localStorage.getItem(key);
    } else {
      return '';
    }
  }

  setElement(key: string, value: string, force: boolean = false): void {
    if (this.isBrowser && (this.cookiesAccepted || force)) {
      localStorage.setItem(key, value);
    }
  }

  removeElement(key: string, force: boolean = false): void {
    if (this.isBrowser && (this.cookiesAccepted || force)) {
      localStorage.removeItem(key);
    }
  }

}
