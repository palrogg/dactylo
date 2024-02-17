import { Component, Input } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';

interface Stat {
  name: string;
  text: string;
  value: Observable<number[]>;
  suffix: string;
}
@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.sass'],
})
export class StatsComponent {
  progression$: Observable<number>;
  errors$: Observable<number[]>;
  accuracy$: Observable<number[]>;
  speed$: Observable<number[]>;
  charCount$: Observable<number[]>;
  stats: Stat[] = [];
  @Input() errorCount?: number;
  constructor(private store: Store) {
    this.progression$ = this.store.select((state) => state.stats.progression)
    this.errors$ = this.store.select((state) => state.stats.errors);
    this.accuracy$ = this.store.select((state) => state.stats.accuracy);
    this.speed$ = this.store.select((state) => state.stats.speed);
    this.charCount$ = this.store.select((state) => state.stats.charCount);
    this.stats = [
      {
        name: 'errors',
        text: 'Nombre d’erreurs',
        value: this.errors$,
        suffix: '',
      },
      {
        name: 'speed',
        text: 'Vitesse',
        value: this.speed$,
        suffix: ' lettres par minute',
      },
      {
        name: 'accuracy',
        text: 'Précision',
        value: this.accuracy$,
        suffix: '%',
      },
    ];

  }
}
