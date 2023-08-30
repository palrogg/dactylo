import { HostListener, Component, Output, EventEmitter } from '@angular/core';
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
  @Output() typingEvent = new EventEmitter<string>();

  constructor(private store: Store) {
    this.loadSentence(0);
  }

  sendTypingEvent(value: string) {
    this.typingEvent.emit(value);
  }

  loadSentence(index: number): void {
    this.currentSentence = this.text.sentences[index];
    this.characterIndex = 0;
    this.typedText = '';
    this.characters = this.currentSentence.replace(/ /g, '␣').split('');
    this.store.dispatch([new SetStartTime(),
    new ShowKey(this.currentSentence[this.characterIndex]),
    ]);
    this.sendTypingEvent("sentence-loaded")
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
    this.sendTypingEvent("wrong-key")
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
    } else if (this.currentDiacriticCode) {
      this.testDiacritic(event);
    } else if (
      // F1... F12 keys: [...Array(13).keys()].map(i => "F"+i.toString())
      !['Shift', 'CapsLock', 'Alt', 'Meta', 'Tab', 'Control', 'Escape', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12'].includes(event.key)
    ) {
      this.wrongKey();
    }
  }
}
