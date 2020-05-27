interface IActionState {
  to: string;
  before?: IActionEvent;
  after?: IActionEvent;
}

interface IActionStates {
  [from: string]: IActionState;
}

interface IActions {
  [action: string]: IActionStates;
}

interface IActionEvent {
  (args: object, data: object): void | boolean | string;
}

interface IStateAction {
  action: string;
  to: string;
  before?: IActionEvent;
  after?: IActionEvent;
}

interface IStates {
  [state: string]: IStateAction[];
}

interface IConfig {
  states: IStates;
  initial: string;
  data?: object;
}
