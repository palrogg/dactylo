import { HostListener, Component } from '@angular/core';
import { Store } from '@ngxs/store';

import { sendKeyCount } from '../state/user.actions'

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.sass'],
})
export class TextComponent {
  constructor(private store: Store) {}
  characterIndex = 0;

  text = `La Comtesse de *** me prit sans m’aimer, continua Damon : elle me trompa. Je me fâchai, elle me quitta : cela était dans l’ordre.`;
  typedText = '';

  splittedText = this.text.split(' ');
  characters = this.text.replace(/ /g, '␣').split('');
  currentDiacriticCode: number | null = null;
  wrongCharacters: Array<number> = [];
  errorCount = 0;

  rightKey(): void {
    this.characterIndex += 1;
    this.store.dispatch(new sendKeyCount(this.characterIndex));
  }

  wrongKey(): void {
    console.log('NOPE');
    if (!this.wrongCharacters.includes(this.characterIndex)) {
      this.wrongCharacters.push(this.characterIndex);
    }
    this.errorCount++;
    console.log(this.errorCount)
  }

  @HostListener('document:keydown', ['$event'])
  onKeyUp(event: KeyboardEvent): void {
    

    if (event.code === 'Space') {
      event.preventDefault();
    }
    if (
      event.key === this.text[this.characterIndex] ||
      (this.text[this.characterIndex] === '’' && event.key === "'")
    ) {
      this.rightKey();
    } else if (event.key === 'Dead') {
      // Diacritic ^/` on chfr keyboards
      if (event.code === 'Equal') {
        this.currentDiacriticCode = event.shiftKey ? 768 : 770; // ` vs ^
      }
    } else if (this.currentDiacriticCode) {
      const combine = String.fromCharCode(
        event.key.charCodeAt(0),
        this.currentDiacriticCode
      );
      if (
        this.text[this.characterIndex].normalize('NFD') ===
        combine.normalize('NFD')
      ) {
        this.rightKey();
      } else {
        this.wrongKey();
      }
      this.currentDiacriticCode = null;
    } else if (
      ['Shift', 'CapsLock', 'Alt', 'Meta', 'Tab'].includes(event.key)
    ) {
      // Modifier; ignore.
      console.log('modifier');
    } else {
      console.log(event);
      console.log(event.key);
      this.wrongKey();
    }
  }
}
