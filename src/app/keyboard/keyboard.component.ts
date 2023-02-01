import { Component } from '@angular/core';

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.sass'],
})
export class KeyboardComponent {
  currentKey = "J"

  keyRows = [
    [
      {
        key: 'Backquote',
        text: '§',
        class: 'default',
      },
      {
        key: 'Digit1',
        text: '1',
        class: 'default',
      },
      {
        key: 'Digit2',
        text: '2',
        class: 'default',
      },
      {
        key: 'Digit3',
        text: '3',
        class: 'default',
      },
      {
        key: 'Digit4',
        text: '4',
        class: 'default',
      },
      {
        key: 'Digit5',
        text: '5',
        class: 'default',
      },
      {
        key: 'Digit6',
        text: '6',
        class: 'default',
      },
      {
        key: 'Digit7',
        text: '7',
        class: 'default',
      },
      {
        key: 'Digit8',
        text: '8',
        class: 'default',
      },
      {
        key: 'Digit9',
        text: '9',
        class: 'default',
      },
      {
        key: 'Digit0',
        text: '0',
        class: 'default',
      },
      {
        key: 'Minus',
        text: "'",
        class: 'default',
      },
      {
        key: 'Equal',
        text: '^',
        class: 'default',
      },
      {
        key: 'Backspace',
        text: '←',
        class: 'default',
      },
    ],
    [
      {
        key: 'Tab',
        text: '↹',
        class: 'double',
      },
      {
        key: 'KeyQ',
        text: 'Q',
        class: 'default',
      },
      {
        key: 'KeyW',
        text: 'W',
        class: 'default',
      },
      {
        key: 'KeyE',
        text: 'E',
        class: 'default',
      },
      {
        key: 'KeyR',
        text: 'R',
        class: 'default',
      },
      {
        key: 'KeyT',
        text: 'T',
        class: 'default',
      },
      {
        key: 'KeyY',
        text: 'Y',
        class: 'default',
      },
      {
        key: 'KeyU',
        text: 'U',
        class: 'default',
      },
      {
        key: 'KeyI',
        text: 'I',
        class: 'default',
      },
      {
        key: 'KeyO',
        text: 'O',
        class: 'default',
      },
      {
        key: 'KeyP',
        text: 'P',
        class: 'default',
      },
      {
        key: 'BracketLeft',
        text: 'è',
        class: 'default',
      },
      {
        key: 'BracketRight',
        text: '¨',
        class: 'default',
      },
    ],
    [
      {
        key: 'CapsLock',
        text: '⇪',
        class: 'default',
      },
      {
        key: 'KeyA',
        text: 'A',
        class: 'default',
      },
      {
        key: 'KeyS',
        text: 'S',
        class: 'default',
      },
      {
        key: 'KeyD',
        text: 'D',
        class: 'default',
      },
      {
        key: 'KeyF',
        text: 'F',
        class: 'default',
      },
      {
        key: 'KeyG',
        text: 'G',
        class: 'default',
      },
      {
        key: 'KeyH',
        text: 'H',
        class: 'default',
      },
      {
        key: 'KeyJ',
        text: 'J',
        class: 'default',
      },
      {
        key: 'KeyK',
        text: 'K',
        class: 'default',
      },
      {
        key: 'KeyL',
        text: 'L',
        class: 'default',
      },
      {
        key: 'Semicolon',
        text: 'é',
        class: 'default',
      },
      {
        key: 'Quote',
        text: 'à',
        class: 'default',
      },
      {
        key: '$',
        text: '$',
        class: 'default',
      },
      {
        key: 'Enter',
        text: '↵',
        class: 'default',
      },
    ],
    [
      {
        key: 'ShiftLeft',
        text: '⇧',
        class: 'shiftleft',
      },
      {
        key: 'KeyZ',
        text: 'Z',
        class: 'default',
      },
      {
        key: 'KeyX',
        text: 'X',
        class: 'default',
      },
      {
        key: 'KeyC',
        text: 'C',
        class: 'default',
      },
      {
        key: 'KeyV',
        text: 'V',
        class: 'default',
      },
      {
        key: 'KeyB',
        text: 'B',
        class: 'default',
      },
      {
        key: 'KeyN',
        text: 'N',
        class: 'default',
      },
      {
        key: 'KeyM',
        text: 'M',
        class: 'default',
      },
      {
        key: 'Comma',
        text: ',',
        class: 'default',
      },
      {
        key: 'Period',
        text: '.',
        class: 'default',
      },
      {
        key: 'Slash',
        text: '-',
        class: 'default',
      },
      {
        key: 'ShiftRight',
        text: '⇧',
        class: 'shiftright',
      },
    ],
    [
      {
        key: 'ControlLeft',
        text: 'ctrl',
        class: 'one-and-a-half',
      },
      {
        key: 'AltLeft',
        text: 'alt',
        class: 'one-and-a-half',
      },
      {
        key: 'Space',
        text: '   ',
        class: 'space',
      },
      {
        key: 'AltRight',
        text: 'alt',
        class: 'one-and-a-half',
      },
      {
        key: 'ControlRight',
        text: 'ctrl',
        class: 'one-and-a-half',
      },
    ],
  ];
}
