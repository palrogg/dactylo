import { Component } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { withLatestFrom } from 'rxjs/operators';
import { SendKey } from '../state/stats.state';
import { FeedAnimals } from '../state/zoo.state';

import keys from './keyboard.json';

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.sass'],
})
export class KeyboardComponent {
  // @Select(state => state.animals) animals$: Observable<any>;
  currentKey = 'J';

  keyRows = keys;

  constructor(private store: Store) {}

  addAnimal(name: string) {
    console.log('test');
    this.store.dispatch([new FeedAnimals()]);
    // .subscribe(() => console.log("SUSCRIBE"));
    // .pipe(withLatestFrom(this.animals$))
    // .subscribe(([_, animals]) => {
    //   // do something with animals
    //   console.group('ANIMALS');
    //   console.log(animals);
    //   console.groupEnd();
    // });
  }
}
