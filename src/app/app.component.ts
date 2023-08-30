import { Component } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  keyframes,
} from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
  animations: [
    trigger('shake', [
      transition('false => true', [
        animate('0.25s', keyframes([
          style({ transform: 'translateX(0%) rotate(-1deg)' }),
          style({ transform: 'translateX(1%) rotate(1deg)' }),
          style({ transform: 'translateX(-1%) rotate(-1deg)' }),
          style({ transform: 'translateX(1%) rotate(1deg)' }),
          style({ transform: 'translateX(-1%) rotate(-1deg)' }),
          style({ transform: 'translateX(0%) rotate(0deg)' })
        ])),
      ])
    ]),
    trigger('slide', [
      transition('false => true', [
        animate('0.1s', keyframes([
          style({ transform: 'translateX(200%)' }),
          style({ transform: 'translateX(0%)' }),
        ])),
      ])
    ]),
  ],
})
export class AppComponent {
  title = 'Dactylo';
  shake = false
  slide = false
  slidex = false


  createAnimation(eventName: string) {
    console.log(eventName)
    if (eventName === 'wrong-key') {
      this.shake = true
      setTimeout(() => {
        this.shake = false
      }, 300);

      setTimeout(() => {
        console.log('slide true!')
        // this.slide = true
      }, 500)
    } else if (eventName === 'sentence-loaded') {
      this.slide = true
      setTimeout(() => {
        this.slide = false
      }, 300);
    }

  }
}
