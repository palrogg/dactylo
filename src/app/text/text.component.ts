import { HostListener, Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { ShowKey } from '../state/keyboard.actions';
import {
  SendWrongKey,
  SendCorrectKey,
  SetStartTime,
} from '../state/stats.state';
import texts from './texts.json';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.sass'],
})
export class TextComponent {
  sentenceIndex = 0;
  characterIndex = 0;

  text = texts[0];
  currentSentence = this.text.sentences[0];
  typedText = '';
  characters = this.currentSentence.replace(/ /g, '␣').split('');
  currentDiacriticCode: number | null = null;
  wrongCharacters: Array<number> = [];
  errorCount = 0;

  constructor(private store: Store) {
    this.loadSentence(0);
  }

  waitForFocus(): void {
    alert("No more focus!!")
  }

  loadSentence(index: number): void {
    this.currentSentence = this.text.sentences[index];
    this.characterIndex = 0;
    this.typedText = '';
    this.characters = this.currentSentence.replace(/ /g, '␣').split('');
    this.store.dispatch([new SetStartTime()]);
  }

  correctKey(): void {
    this.characterIndex += 1;
    this.store.dispatch([
      new SendCorrectKey(),
      new ShowKey(this.currentSentence[this.characterIndex]),
    ]);
    if (this.characterIndex >= this.characters.length) {
      this.sentenceIndex++;
      this.loadSentence(this.sentenceIndex);
    }
  }

  wrongKey(): void {
    if (!this.wrongCharacters.includes(this.characterIndex)) {
      this.wrongCharacters.push(this.characterIndex);
    }
    this.errorCount++;
    this.store.dispatch([new SendWrongKey()]);
  }

  testDiacritic(event: KeyboardEvent): void {
    if (!this.currentDiacriticCode) return;
    const combine = String.fromCharCode(
      event.key.charCodeAt(0),
      this.currentDiacriticCode
    );
    if (
      this.currentSentence[this.characterIndex].normalize('NFD') ===
      combine.normalize('NFD')
    ) {
      this.correctKey();
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
      event.key === this.currentSentence[this.characterIndex] ||
      (this.currentSentence[this.characterIndex] === '’' && event.key === "'")
    ) {
      this.correctKey();
    } else if (event.key === 'Dead') {
      // Diacritic ^/` on chfr keyboards
      if (event.code === 'Equal') {
        this.currentDiacriticCode = event.shiftKey ? 768 : 770; // ` vs ^
      }
      // Diacritic ¨ on chfr keyboards
      if (event.code === 'BracketRight') {
        this.currentDiacriticCode = 776 // "ï".normalize('NFD').charCodeAt(1)
      }
    } else if (this.currentDiacriticCode) {
      this.testDiacritic(event);
    } else if (
      !['Shift', 'CapsLock', 'Alt', 'Meta', 'Tab'].includes(event.key)
    ) {
      this.wrongKey();
    }
  }
}
