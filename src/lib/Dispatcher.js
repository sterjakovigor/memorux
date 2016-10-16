class Dispatcher {

  _collection = {}

  get collection() {
    return this._collection
  }

  set collection(newCollection = false) {
    if (newCollection) {
      this._collection = newCollection
    }
  }

  _stores = []

  get stores() {
    return this._stores
  }

  set stores(newStores = false) {
    if (newStores) {
      this._stores = newStores
    }
  }

  constructor(storesArray) {
    this.setCollectionByArrayOfStores(storesArray)
  }

  setCollectionByArrayOfStores(storesArray = false) {
    if (storesArray) {
      for (let Store of storesArray) {
        let store = new Store
        this.stores.push(store)
        this.collection = { ...this.collection, ...store.collection }
      }
    }
  }

  dispatch(action, payload = {}) {
    for (let store of this.stores ) {
      const newCollection = store.dispatch.apply(store, arguments)
      this.collection = { ...this.collection, ...newCollection }
    }
    return this.collection
  }

}

export default Dispatcher
