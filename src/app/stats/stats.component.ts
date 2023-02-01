import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.sass'],
})

// export interface Course {
//   id: string;
//   name: string;
//   description: string;
// }


export class StatsComponent {
  @Input() errorCount?: number;
  
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
}
