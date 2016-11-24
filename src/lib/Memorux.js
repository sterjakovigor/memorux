export default class Memorux {


  _waitingActions = []


  _action_id = 0


  _onChange = false

  get onChange() {
    return this._onChange
  }

  set onChange(newOnChange) {
    if (newOnChange) {
      this._onChange = newOnChange
    }
  }


  _stores = {}

  get store() {
    return this._stores
  }

  set store(newStore) {
    if (newStore) {
      this._stores = newStore
    }
  }


  _storeClasses = {}

  get storeClasses() {
    return this._storeClasses
  }

  set storeClasses(newDispatchers) {
    if (newDispatchers) {
      this._storeClasses = newDispatchers
    }
  }


  constructor(newStore) {
    this.stores = newStore
  }


  touchStore() {
    if(this._onChange) this.onChange(this.stores)
  }


  dispatch(action) {
    action.id = this._action_id++
    if (action.wait != undefined && action.wait.length > 0) {
      this._waitingActions.push(action)
    } else {
      this.dispatchAction(action)
    }
    return action
  }

  dispatchAction(action) {

    let promisedDispatchers = []

    for ( let storeName in this.storeClasses ) {
      let storeInstance = new this.storeClasses[storeName]
      if (typeof storeInstance.dispatch != "function") continue
      let dispatchedStore = storeInstance.dispatch(this.stores[storeName], action)
      if (typeof dispatchedStore == "function") {
        promisedDispatchers.push({ callback: dispatchedStore, storeName })
      } else {
        this.updateStore({ storeName, newState: dispatchedStore })
      }
    }

    promisedDispatchers.forEach((dispatcher, index) => {
      new Promise(dispatcher.callback).then((newState) => {
        this.updateStore({ storeName: dispatcher.storeName, newState })

        let readyActions = this.getReadyWaitingActions(action)
        readyActions.forEach((readyAction, index) => {
          this.dispatchAction(readyAction)
        })

      })
    })


  }


  getReadyWaitingActions(action) {
    let readyActions = []

    this._waitingActions = this._waitingActions.filter((_waitingAction, index) => {
      this._waitingActions[index].wait = _waitingAction.wait.filter((waitFor, index) => {
        if (waitFor.id == action.id) { return false } else { return true }
      })
      if(this._waitingActions[index].wait.length == 0) {
        readyActions.push(this._waitingActions[index])
        return false
      } else {
        return true
      }
    })

    return readyActions
  }


  updateStore({ storeName, newState }) {
    if (newState != undefined && this.stores[storeName] != newState) {
      this.stores = { ...this.stores, ...{ [storeName]: newState } }
      this.touchStore()
    }
  }


  assignStores(newStoreClasses) {
    this.storeClasses = newStoreClasses
    for ( let name in this.storeClasses ) {
      let storeInstance = new this.storeClasses[name]
      let initialState = storeInstance.initialState
      if (initialState != undefined) {
        this.stores = {
          ...this.stores,
          ...{ [name]: initialState }
        }
      }
    }
  }


}
