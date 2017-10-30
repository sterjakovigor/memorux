const Memorux = require('../index')

describe('Memorux', () => {

  it('dispatch promise must resolve after all async actions', (done) => {

    class Cat {

      constructor(state) {

        this.state = {
          say: null
        }

      }

      dispatch(state, action) {

        switch (action.name) {

          case 'update': {

            return (resolve, reject) => {

              setTimeout(() => {

                resolve(action.data)

              }, 20)

            }

          }

          default: {

            return state

          }

        }

      }

    }

    class Bird {

      constructor(state) {

        this.state = {
          say: null
        }

      }

      dispatch(state, action) {

        switch (action.name) {

          case 'update': {

            return (resolve, reject) => {

              setTimeout(() => {

                resolve(action.data)

              }, 10)

            }

          }

          default: {

            return state

          }

        }

      }

    }

    const memorux = new Memorux({ Bird, Cat })

    memorux.dispatch([
      {
        name: 'Bird#update',
        data: {
          say: 'chirik'
        }
      },
      {
        name: 'Cat#update',
        data: {
          say: 'meow'
        }
      },
    ]).then((store) => {

      expect(store).toEqual({
        Bird: {
          say: 'chirik'
        },
        Cat: {
          say: 'meow'
        },
      })

      done()

    })

  })

  it('dispatch array of multiple sync actions in same store', () => {

    class Bird {

      constructor(state) {

        this.state = {
          say: null,
          name: null,
        }

      }

      dispatch(state, action) {

        switch (action.name) {

          case 'update': {

            return Object.assign({}, state, action.data)

          }

          default: {

            return state

          }

        }

      }

    }

    const memorux = new Memorux({ Bird })

    memorux.dispatch([
      {
        name: 'Bird#update',
        data: {
          say: 'chirik'
        }
      },
      {
        name: 'Bird#update',
        data: {
          name: 'Charlie'
        }
      },
    ])

    expect(memorux.store).toEqual({
      Bird: {
        say: 'chirik',
        name: 'Charlie',
      },
    })

  })

  it('dispatch array of async actions in different stores', (done) => {

    class Bird {

      constructor(state) {

        this.state = {
          say: null
        }

      }

      dispatch(state, action) {

        switch (action.name) {

          case 'update': {

            return (resolve, reject) => {

              setImmediate(() => {

                resolve({
                  say: 'chirik'
                })

              })

            }

          }

          default: {

            return state

          }

        }

      }

    }

    const memorux = new Memorux({ Bird })

    memorux.onChange((store) => {

      expect(store).toEqual({
        Bird: {
          say: 'chirik'
        }
      })

      done()

    })


    memorux.dispatch([
      {
        name: 'Bird#update',
        data: {
          say: 'chirik'
        }
      }
    ])

  })

  it('dispatch array of multiple sync actions', () => {

    class Cat {

      constructor(state) {

        this.state = {
          say: null
        }

      }

      dispatch(state, action) {

        switch (action.name) {

          case 'update': {

            return action.data

          }

          default: {

            return state

          }

        }

      }

    }

    class Bird {

      constructor(state) {

        this.state = {
          say: null
        }

      }

      dispatch(state, action) {

        switch (action.name) {

          case 'update': {

            return action.data

          }

          default: {

            return state

          }

        }

      }

    }

    const memorux = new Memorux({ Bird, Cat })

    memorux.dispatch([
      {
        name: 'Bird#update',
        data: {
          say: 'chirik'
        }
      },
      {
        name: 'Cat#update',
        data: {
          say: 'meow'
        }
      },
    ])

    expect(memorux.store).toEqual({
      Bird: {
        say: 'chirik'
      },
      Cat: {
        say: 'meow'
      }
    })

  })

  it('dispatch array of sync actions', () => {

    class Bird {

      constructor(state) {

        this.state = {
          say: null
        }

      }

      dispatch(state, action) {

        switch (action.name) {

          case 'update': {

            return action.data

          }

          default: {

            return state

          }

        }

      }

    }

    const memorux = new Memorux({ Bird })

    memorux.dispatch([
      {
        name: 'Bird#update',
        data: {
          say: 'chirik'
        }
      }
    ])

    expect(memorux.store).toEqual({
      Bird: {
        say: 'chirik'
      }
    })

  })

  it('dispatch with arguments', () => {

    class Bird {

      constructor(state) {

        this.state = {
          say: null
        }

      }

      dispatch(state, action) {

        switch (action.name) {

          case 'update': {

            return action.data

          }

          default: {

            return state

          }

        }

      }

    }

    const memorux = new Memorux({ Bird })

    memorux.dispatch('Bird#update', {
      say: 'chirik'
    })

    expect(memorux.store).toEqual({
      Bird: {
        say: 'chirik'
      }
    })

  })

  it('dispatch with object', () => {

    class Bird {

      constructor(state) {

        this.state = {
          say: null
        }

      }

      dispatch(state, action) {

        switch (action.name) {

          case 'update': {

            return action.data

          }

          default: {

            return state

          }

        }

      }

    }

    const memorux = new Memorux({ Bird })

    memorux.dispatch({
      name: 'Bird#update',
      data: {
        say: 'chirik'
      }
    })

    expect(memorux.store).toEqual({
      Bird: {
        say: 'chirik'
      }
    })

  })

  it('error when store doesn\'t present', () => {

    const memorux = new Memorux()

    expect(
      () => {
        memorux.dispatch({
          name: 'Bird#update',
          data: {
            say: 'chirik'
          }
        })
      }
    ).toThrowError('Store "Bird" doesn\'t exist')

  })

  it('error when dispatch method doesn\'t present', () => {

    class Bird {

      constructor(state) {

        this.state = {
          say: null
        }

      }

    }

    const memorux = new Memorux({ Bird })

    expect(
      () => {
        memorux.dispatch({
          name: 'Bird#update',
          data: {
            say: 'chirik'
          }
        })
      }
    ).toThrowError('Dispatch method in "Bird" store doesn\'t exist')

  })

  it('error when wrong action format', () => {

    class Bird {

      constructor(state) {

        this.state = {
          say: null
        }

      }

      dispatch(state, action) {

        switch (action.name) {

          case 'update': {

            return action.data

          }

          default: {

            return state

          }

        }

      }

    }

    const memorux = new Memorux({ Bird })

    expect(
      () => {
        memorux.dispatch(undefined)
      }
    ).toThrowError(
      'memorux.dispatch(action) must be array [] or ' +
      'object {} or string with object'
    )


  })

  it('assign stores', () => {

    class Cat {

      constructor(state) {

        this.state = {
          say: null
        }

      }

    }

    class Bird {

      constructor(state) {

        this.state = {
          say: null
        }

      }

    }

    const memorux = new Memorux({ Cat, Bird })

    expect(memorux.store).toEqual({
      Cat: { say: null },
      Bird: { say: null },
    })

  })

})
