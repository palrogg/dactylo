import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';

export class SendKey {
  static readonly type = '[Stats] SendKey';
}

export interface StatsStateModel {
  errors: number;
}

@State<StatsStateModel>({
  name: 'stats',
  defaults: {
    errors: 0,
  },
})
@Injectable()
export class StatsState {
  @Action(SendKey)
  SendKey(ctx: StateContext<StatsStateModel>) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      errors: state.errors + 1,
    });
  }
}
