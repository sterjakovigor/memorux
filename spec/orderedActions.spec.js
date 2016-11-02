import Memorux from '../src/lib/Memorux'

describe("Ordered actions", () => {

  it("must be update stores in order", (done) => {

    let initialState = {
      awoke: false,
    }

    let dispatch = ({ timeout, name }) => {
      return (store, action) => {
        switch(action.name) {
          case name.toUpperCase() + '_GOOD_MORNING':
            return (resolve, reject) => {
              setTimeout(() => {
                resolve({ awoke: true })
              }, timeout)
            }
            break
        }
      }
    }

    let fairyClasses = []
    let fairyNames = [ 'Sara', 'Jessica', 'Barbara' ]
    fairyNames.forEach((fairy, index) => {
      fairyClasses[fairy + 'Store'] = () => {}
      fairyClasses[fairy + 'Store'].prototype.initialState = initialState
      fairyClasses[fairy + 'Store'].prototype.dispatch = dispatch({
        name: fairy,
        timeout: (fairyNames.length - index) * 10,
      })
    })

    let memorux = new Memorux()

    memorux.assignStores({
      SaraStore:    fairyClasses['SaraStore'],
      JessicaStore: fairyClasses['JessicaStore'],
      BarbaraStore: fairyClasses['BarbaraStore'],
    })

    let counter = 0
    memorux.onChange = (store) => {

      switch (counter) {
        case 0:
          expect(store.SaraStore.awoke).toBe(true)
          expect(store.JessicaStore.awoke).toBe(false)
          expect(store.BarbaraStore.awoke).toBe(false)
          break
        case 1:
          expect(store.SaraStore.awoke).toBe(true)
          expect(store.JessicaStore.awoke).toBe(true)
          expect(store.BarbaraStore.awoke).toBe(false)
          break
        case 2:
          expect(store.SaraStore.awoke).toBe(true)
          expect(store.JessicaStore.awoke).toBe(true)
          expect(store.BarbaraStore.awoke).toBe(true)
          break
      }

      if (++counter == 3) done()
    }

    let saraAction = memorux.dispatch({ name: 'SARA_GOOD_MORNING' })
    let jessicaAction = memorux.dispatch({  name: 'JESSICA_GOOD_MORNING', wait: [ saraAction ] })
    memorux.dispatch({ name: 'BARBARA_GOOD_MORNING',  wait: [ saraAction, jessicaAction ] })

  })


})
