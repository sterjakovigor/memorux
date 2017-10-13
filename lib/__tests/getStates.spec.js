const Memorux = require('../')

describe('Memorux.getStates()', () => {

  it('Object with default states of stores', () => {

    const stores = {

      Duck: class Duck {

        constructor() {

          this.state = 'duck'

        }

      },

      Bird: class Bird {

        constructor() {

          this.state = 'bird'

        }

      },

    }

    expect(
      Memorux.getStates(stores)
    ).toEqual({
      Duck: 'duck',
      Bird: 'bird'
    })

  })

})
