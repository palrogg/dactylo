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

  currentKey$: Observable<number[]>;
  constructor(private store: Store) {
    this.currentKey$ = this.store.select(
      (state) => state.keyboard.currentKeys[0]
    );
    this.currentKey$.forEach((i) => {
      this.highlightKey = typeof i === 'string' ? i : '';
    });
  }
}
