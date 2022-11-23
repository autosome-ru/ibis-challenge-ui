import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-github-login-callback',
  template: '<div class="page-center">' +
    '  <mat-spinner class="mat-spinner_medium" [diameter]="56"></mat-spinner>' +
    '  Loading, please wait...</div>',
  styles: [".page-center {\n" +
  "  position: absolute;\n" +
  "  top: 50vh;\n" +
  "  left: 50vw;\n" +
  "  transform: translate(-50%, -50%);\n" +
  "  display: flex;\n" +
  "  flex-flow: column nowrap;\n" +
  "  align-items: center;\n" +
  "  gap: 30px;\n" +
  "}"]

})

//<button (click)="onWindowClose()"></button>
export class CallbackComponent implements OnInit {

  constructor(
    private route: ActivatedRoute) {
  }


  ngOnInit() {
    (<any>window).navigation_present = true;
    console.log(this.route.toString())
    sessionStorage.setItem("code", this.route.snapshot.queryParams['code'])
    //setTimeout(() => window.close(), 5000)
    console.log("This")
    window.close()
  }

  onWindowClose() {
    window.close()
  }

}
