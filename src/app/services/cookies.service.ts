import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from "@angular/common";


@Injectable()
export class CookiesService {
  private readonly isBrowser: boolean;
  cookiesAccepted: boolean;

  constructor(
    @Inject(PLATFORM_ID) private platformId
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    if (this.isBrowser) {
      this.cookiesAccepted = true;
    }
  }

  acceptCookies(): void {
    this.setElement('useCookies', 'true', true);
  }

  getElementById(key: string): string {
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

}
