import { HostListener, Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { ShowKey } from '../state/keyboard.actions'; // SendKeyCount
import { SendKeyCount, AddError } from '../state/text.actions';
import texts from './texts.json';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.sass'],
})
export class TextComponent {
  constructor(private store: Store) {}
  characterIndex = 0;

  text = texts[0].sentences[0];
  typedText = '';

  splittedText = this.text.split(' ');
  characters = this.text.replace(/ /g, '␣').split('');
  currentDiacriticCode: number | null = null;
  wrongCharacters: Array<number> = [];
  errorCount = 0;

  rightKey(): void {
    this.characterIndex += 1;
    this.store.dispatch([
      new SendKeyCount(this.characterIndex),
      new ShowKey(this.text[this.characterIndex]),
    ]);
  }

  wrongKey(): void {
    console.log('NOPE');
    if (!this.wrongCharacters.includes(this.characterIndex)) {
      this.wrongCharacters.push(this.characterIndex);
    }
    this.errorCount++;
    // console.log(this.errorCount);
    this.store.dispatch(new AddError('u'));
  }

  testDiacritic(event: KeyboardEvent): void {
    if (!this.currentDiacriticCode) return;
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
  }

  @HostListener('document:keydown', ['$event'])
  onKeyUp(event: KeyboardEvent): void {
    if (event.code === 'Space') {
      // Prevent scrolldown
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
      this.testDiacritic(event);
    } else if (
      !['Shift', 'CapsLock', 'Alt', 'Meta', 'Tab'].includes(event.key)
    ) {
      console.log(event);
      console.log(event.key);
      this.wrongKey();
    }
  }
}
