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

class StateMachine {
  _config: IConfig;
  _states: IStates;
  _actions: IActions;
  _state: string;
  _data: object;
  [action: string]: any

  setActions() {
    const states: string[] = Object.keys(this._states);
    for (const state in this._states) {
      this._states[state].forEach((item) => {
        if (!states.includes(item.to)) {
          throw `The state '${item.to}' is not valid`;
        }
        if (!this._actions[item.action]) this._actions[item.action] = {};
        this._actions[item.action][state] = {
          to: item.to,
          before: item.before || undefined,
          after: item.after || undefined,
        };
      });
    }
  }

  setActionMethods() {
    for (const action in this._actions) {
      const actionStates: IActionStates = this._actions[action];
      const states: string[] = Object.keys(actionStates);
      this[action] = (args: object): this => {
        if (!states.includes(this._state)) {
          throw `Action '${action}' invalid from state '${this._state}'`;
        } else {
          const before = actionStates[this._state].before;
          const after = actionStates[this._state].after;
          if (before) {
            before(args || {}, this._data);
          }
          this._state = actionStates[this._state].to;
          if (after) {
            after(args || {}, this._data);
          }
        }
        return this;
      };
    }
  }

  constructor(config: IConfig) {
    const { states, initial, data = {} } = config;
    const statesArray = Object.keys(states);
    if (!statesArray.includes(initial)) {
      throw `${initial} is not a valid state`;
    }

    this._data = data;
    this._state = initial;
    this._states = states;
    this._config = config;
    this._actions = {};

    this.setActions();
    this.setActionMethods();
  }

  get state(): string {
    return this._state;
  }

  get config(): IConfig {
    return this._config;
  }

  can(action: string): boolean {
    const states: IActionStates = this._actions[action];
    return Object.keys(states).includes(this._state);
  }

  actions() {
    return this._states[this._state].map((i) => i.action);
  }
}

export default StateMachine;
