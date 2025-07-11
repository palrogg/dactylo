import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import keys from './keyboard.json';

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.sass'],
})
export class KeyboardComponent {
  keyRows = keys;
  highlightKey = '';
  highlightKeys: string[] = [];

  currentKeys$: Observable<number[]>;

  constructor(private store: Store) {
    this.currentKeys$ = this.store.select(
      (state) => state.keyboard.currentKeys
    );

    this.currentKeys$.forEach((keys) => {
      this.highlightKeys = [];
      keys.forEach((i) => {
        if (typeof i === 'string') {
          this.highlightKeys.push(i);
        }
      });
    });
  }
}
