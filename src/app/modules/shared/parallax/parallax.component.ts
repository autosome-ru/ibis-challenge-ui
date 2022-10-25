import {ChangeDetectionStrategy, Component, HostBinding, Input, OnInit} from '@angular/core';
import {fromEvent, Subscription} from "rxjs";
import {IParallaxLabels} from "./parallax.module";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'competition-parallax',
  templateUrl: './parallax.component.html',
  styleUrls: ['./parallax.component.scss']
})
export class ParallaxComponent implements OnInit {

  @Input()
  labels: IParallaxLabels[] = [];

  @HostBinding("style.--left")
  @Input()
  left?: string

  @HostBinding("style.--right")
  @Input()
  right?: string

  @HostBinding("style.--top")
  @Input()
  top?: string

  @HostBinding("style.--bottom")
  @Input()
  bottom?: string

  @HostBinding("style.--parallax_x")
  parallax_x: string = '0';

  @HostBinding("style.--parallax_y")
  parallax_y: string = '0';

  @Input() isFloating = true;

  @Input() isMouseMoving = true;

  mouse_move!: Subscription;

  scale_mouse_move = 25;

  constructor() {
  }

  ngOnInit(): void {
    if (this.isMouseMoving) {
      this.mouse_move =
        fromEvent(document, 'mousemove')
          .subscribe((e: any) => {
            this.parallax_x = ((e.clientX / e.view.innerWidth - 0.5) * this.scale_mouse_move).toString() + "px";
            this.parallax_y = ((e.clientY / e.view.innerHeight - 0.5) * this.scale_mouse_move).toString() + "px";

            return {
              mouseXprop: e.clientX / e.view.innerWidth,
              mouseYprop: e.clientY / e.view.innerHeight
            }
          });
    }
  }

  ngOnDestroy() {
    if (this.isMouseMoving) {
      this.mouse_move.unsubscribe();
    }
  }
}
