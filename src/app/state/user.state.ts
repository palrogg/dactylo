import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { UserAction, sendKeyCount } from './user.actions';

export class UserStateModel {
  public keyCount: number;
  public errorCount: number;
}


@State<UserStateModel>({
  keyCount: 0,
  errorCount: 0,
  defaults:{
    keyCount: 0,
    errorCount: 0,
  }
})
@Injectable()
export class UserState {
  @Action(sendKeyCount)
  add({ getState, setState }: StateContext<UserStateModel>, { payload }: sendKeyCount) {
    const state = getState();
    setState({ items: [ ...state.items, payload ] });
  }
}
