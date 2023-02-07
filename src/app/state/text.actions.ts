export class SendKeyCount {
  static readonly type = '[Text] send key count'
  constructor(public keyCount: number) {}
}

export class AddError {
  static readonly type = '[Text] add error'
  constructor(public error: string) {}
}