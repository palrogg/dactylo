import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { patch, append } from '@ngxs/store/operators';

export class RecordError {
  static readonly type = '[ErrorData] RecordError';
  constructor(public error: ErrorRecord) { }
}

export interface ErrorDataStateModel {
  errors: ErrorRecord[]
}

@State<ErrorDataStateModel>({
  name: 'ErrorData',
})
@Injectable()
export class ErrorDataState {
  @Action(RecordError)
  RecordError(ctx: StateContext<ErrorDataStateModel>, action: RecordError) {
    ctx.setState(
      patch<ErrorDataStateModel>({
        errors: append<ErrorRecord>([action.error])
      })
    );
  }
}
