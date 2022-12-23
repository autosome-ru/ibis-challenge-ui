import {ChangeDetectionStrategy, Component, HostBinding, Input, OnInit} from '@angular/core';
import {interval, map, Observable} from "rxjs";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'competition-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss']
})

export class LogoComponent implements OnInit {
  @HostBinding("style.--height")
  @Input()
  height: string = "364px";

  @Input()
  isAnimated: boolean = true;

  @HostBinding("style.--duration")
  @Input()
  duration: string = "0.85s"

  //public switching!: Subscription;
  public source!: Observable<number>;

  ngOnInit(): void {
    this.source = interval(1000).pipe(map(x => x % 5));
  }

}
