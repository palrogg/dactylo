import { Component } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { withLatestFrom } from 'rxjs/operators';
import { SendWrongKey } from '../state/stats.state';
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
}
