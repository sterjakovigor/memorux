export default class Memorux {


  _onChange = false

  get onChange() {
    return this._onChange
  }

  set onChange(newOnChange) {
    if (newOnChange) {
      this._onChange = newOnChange
    }
  }


  _store = {}

  get store() {
    return this._store
  }

  set store(newStore) {
    if (newStore) {
      this._store = newStore
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
    this.store = newStore
  }


  touchStore() {
    if(this._onChange) this.onChange(this.store)
  }


  dispatch(action) {
    for ( let name in this.storeClasses ) {
      let storeInstance = new this.storeClasses[name]
      if (typeof storeInstance.dispatch != "function") continue
      let dispatchedStore = storeInstance.dispatch(this.store[name], action)
      if (typeof dispatchedStore == "function") {
        new Promise(dispatchedStore).then((newStore) => {
          if(this.store[name] != newStore) {
            this.store[name] = newStore
            this.touchStore()
          }
        })
      } else if (this.store[name] != dispatchedStore && dispatchedStore != undefined) {
        this.store[name] = dispatchedStore
        this.touchStore()
      }
    }
  }


  assignStores(newStoreClasses) {
    this.storeClasses = newStoreClasses
    for ( let name in this.storeClasses ) {
      let storeInstance = new this.storeClasses[name]
      let initialState = storeInstance.initialState
      if (initialState != undefined) {
        this.store = {
          ...this.store,
          ...{ [name]: initialState }
        }
      }
    }
  }


}
