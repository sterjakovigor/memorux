import Store from '../src/lib/Store'

describe("Store", () => {

  describe("assign collection", () => {

    let testCollection = {
      numbers: [
        { id: 1, name: 'first'  },
        { id: 2, name: 'second' },
        { id: 3, name: 'third'  },
      ]
    }

    it("by class declaration", () => {
      class ExampleStore extends Store {
        _collection = testCollection
      }
      let exampleStore = new ExampleStore()
      expect(exampleStore.collection.numbers.length).toEqual(3)
    })

    it("by class constructor", () => {
      class ExampleStore extends Store {}
      let exampleStore = new ExampleStore(testCollection)
      expect(exampleStore.collection.numbers.length).toEqual(3)
    })

    it("by setter", () => {
      class ExampleStore extends Store {}
      let exampleStore = new ExampleStore()
      exampleStore.collection = testCollection
      expect(exampleStore.collection.numbers.length).toEqual(3)
    })

  })

})
