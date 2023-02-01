import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { AddAnimal } from '../state/animal.actions'; // SendKeyCount
import keys from './keyboard.json';

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.sass'],
})
export class KeyboardComponent {
  constructor(private store: Store) {}

  currentKey = 'J';

  keyRows = keys;

  addAnimal(name: string) {
    console.log('test')
    this.store.dispatch(new AddAnimal(name));
  }
}
