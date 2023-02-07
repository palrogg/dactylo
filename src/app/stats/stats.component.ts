import { Component, Input } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { SendKeyCount } from '../state/text.actions';
import { SendKey } from '../state/stats.state';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.sass'],
})
export class StatsComponent {
  errors$: Observable<number[]>;

  @Input() errorCount?: number;
  constructor(private store: Store) {
    this.errors$ = this.store.select((state) => state.stats.errors);
    console.log('>', this.errors$);
  }
  keyCountDisplay?: number;

  stats = [
    {
      name: 'speed',
      text: 'Vitesse',
      value: 200,
      suffix: ' lettres par minute',
    },
    {
      name: 'accuracy',
      text: 'Précision',
      value: 90,
      suffix: '%',
    },
    {
      name: 'errors',
      text: 'Nombre d’erreurs',
      value: this.errorCount ? this.errorCount : 0,
      suffix: '',
    },
  ];

  // SendKey() {
  //   console.warn("yes")
  //   this.store
  //     .dispatch(new SendKey())
  //     .subscribe((n) => (alert(n))); // this.keyCountDisplay = n
  // }
  // SendKeyCount(keyCount: number) {
  //   this.store
  //     .dispatch(new SendKeyCount(keyCount))
  //     .subscribe((n) => (alert(n))); // this.keyCountDisplay = n
  // }
}
