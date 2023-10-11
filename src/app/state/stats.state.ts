import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';

export interface ZebraFood {
  charCount: number;
}
export class SendWrongKey {
  static readonly type = '[Stats] SendWrongKey';
}
export class SendCorrectKey {
  static readonly type = '[Stats] SendKey';
}
export class SetStartTime {
  static readonly type = '[Stats] SetStartTime';
}
export class SetProgression {
  static readonly type = '[Stats] SetProgression';
  constructor(public newProgression: number) { }
}

export interface StatsStateModel {
  errors: number;
  speed: number;
  accuracy: number;
  charCount: number;
  progression: number;
  startTime: Date; // Date: cf "sub state" example here https://www.ngxs.io/advanced/sub-states
}

@State<StatsStateModel>({
  name: 'stats',
  defaults: {
    errors: 0,
    speed: 0,
    accuracy: 0,
    charCount: 0,
    progression: 0,
    startTime: new Date(),
  },
})
@Injectable()
export class StatsState {
  @Action(SendWrongKey)
  SendWrongKey(ctx: StateContext<StatsStateModel>) {
    const state = ctx.getState();
    const newErrorCount = state.errors + 1;
    ctx.setState({
      ...state,
      errors: newErrorCount,
      accuracy: Math.round(
        (state.charCount / (state.charCount + newErrorCount)) * 100
      ),
    });
  }
  @Action(SendCorrectKey)
  SendCorrectKey(ctx: StateContext<StatsStateModel>) {
    const state = ctx.getState();
    const newCharCount = state.charCount + 1;
    const elapsedMinutes = (+new Date() - +state.startTime) / 60000;
    ctx.setState({
      ...state,
      charCount: newCharCount,
      speed: Math.round(newCharCount / elapsedMinutes),
      accuracy: Math.round(
        (newCharCount / (newCharCount + state.errors)) * 100
      ),
    });
  }
  @Action(SetStartTime)
  SetStartTime(ctx: StateContext<StatsStateModel>) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      startTime: new Date(),
      charCount: 0,
    });
  }
  @Action(SetProgression)
  SetProgression(ctx: StateContext<StatsStateModel>, { newProgression }: SetProgression) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      progression: newProgression,
    });
  }
}
