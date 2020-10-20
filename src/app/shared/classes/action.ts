// The number of actions (commit, create, etc.) that a user made on a given day on GitHub
export class Action {
  constructor(public date: Date, public count: number, public id: number) {}
}
