class Store {

  _collection = {}

  get collection() {
    return this._collection
  }

  set collection(newStore) {
    if (newStore) {
      this._collection = newStore
    }
  }

  constructor(newStore = false) {
    this.collection = newStore
  }

}

export default Store;
