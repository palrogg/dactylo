import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { ShowKey } from './keyboard.actions';

export interface KeyboardStateModel {
  currentKeys: string[];
  hideKeyboard: boolean;
}
@State<KeyboardStateModel>({
  name: 'keyboard',
  defaults: {
    currentKeys: [],
    hideKeyboard: false,
  },
})
@Injectable()
export class KeyboardState {
  @Action(ShowKey)
  ShowKey(ctx: StateContext<KeyboardStateModel>, action: ShowKey) {
    const state = ctx.getState();
    let keys = [];
    if (['â', 'ê', 'î', 'ô', 'û'].includes(action.key)) {
      keys = ['^'];
      keys.push(
        action.key
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .toUpperCase()
      );
    } else if (['ä', 'ë', 'ï', 'ö', 'ü'].includes(action.key)) {
      keys = ['¨'];
      keys.push(
        action.key
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .toUpperCase()
      );
    } else if (['à', 'é', 'è'].includes(action.key)) {
      keys.push(action.key);
    } else if (typeof action.key === 'string') {
      keys.push(action.key.toUpperCase());
    }
    ctx.setState({
      ...state,
      currentKeys: keys,
    });
  }
}
