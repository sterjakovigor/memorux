class Memorux {

  constructor(newStore) {
    this.stores = newStore
    this._waitingActions = []
    this._action_id = 0
    this._onChange = false
    this._store = {}
    this._storeInstances = {}
  }


  get onChange() {
    return this._onChange
  }

  set onChange(newOnChange) {
    if (newOnChange) {
      this._onChange = newOnChange
    }
  }


  get store() {
    return this._store
  }

  set store(newStore) {
    if (newStore) {
      this._store = newStore
    }
  }


  get storeInstances() {
    return this._storeInstances
  }

  set storeInstances(newStoreInstance) {
    if (newStoreInstance) {
      this._storeInstances = newStoreInstance
    }
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

    for ( let storeName in this.storeInstances ) {
      const storeInstance = this.storeInstances[storeName]
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

  assignStores(storeInstances) {
    for (const storeName in storeInstances) {
      this.storeInstances[storeName] = new storeInstances[storeName]
    }
    this.assignInitialState()
  }

  assignInitialState() {
    for (const storeName in this.storeInstances) {
      const storeInstance = this.storeInstances[storeName]
      this.stores = {
        ...this.stores,
        ...{ [storeName]: storeInstance.state }
      }
    }
  }


}

module.exports = Memorux
