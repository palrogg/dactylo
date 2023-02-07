import { HostListener, Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { ShowKey } from '../state/keyboard.actions'; // SendKeyCount
// import { SendKeyCount, AddError } from '../state/text.actions';
import { SendKey } from '../state/stats.state';
import texts from './texts.json';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.sass'],
})
export class TextComponent {
  constructor(private store: Store) {}
  sentenceIndex = 0;
  characterIndex = 0;

  text = texts[0];
  currentSentence = this.text.sentences[0];
  typedText = '';
  characters = this.currentSentence.replace(/ /g, '␣').split('');
  currentDiacriticCode: number | null = null;
  wrongCharacters: Array<number> = [];
  errorCount = 0;

  loadSentence(index: number): void {
    this.currentSentence = this.text.sentences[index];
    this.characterIndex = 0;
    this.typedText = '';
    this.characters = this.currentSentence.replace(/ /g, '␣').split('');
  }
  rightKey(): void {
    this.characterIndex += 1;
    this.store.dispatch([
      // new SendKeyCount(this.characterIndex),
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
    // this.store.dispatch(new AddError('u'));
    this.store.dispatch([new SendKey()]);

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
      event.key === this.currentSentence[this.characterIndex] ||
      (this.currentSentence[this.characterIndex] === '’' && event.key === "'")
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
      // console.log(event);
      // console.log(event.key);
      this.wrongKey();
    }
  }
}
