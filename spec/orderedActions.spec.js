import Memorux from '../src/lib/Memorux'

describe("Ordered actions", () => {

  xit("must be update single store in order", (done) => {
    class PostStore {
      initialState = {}

      dispatch(state, action) {

        switch(action.name) {
          case 'POST_ADD':
            return (resolve, reject) => {
              setTimeout(() => {
                resolve({ say: 'Post added!' })
              }, 30)
            }
            break
          case 'POST_CONGRATULATIONS':
            return (resolve, reject) => {
              setTimeout(() => {
                resolve({ say: 'Congratulations!' })
              }, 10)
            }
            break
        }

      }

    }

    let memorux = new Memorux()
    memorux.assignStores({ PostStore })
    let counter = 0
    memorux.onChange = (store) => {
      ++counter
      switch(counter) {
        case 1:
          expect(store.PostStore.say).toEqual('Post added!')
          break
        case 2:
          expect(store.PostStore.say).toEqual('Congratulations!')
          done()
          break
      }
    }
    let postAddAction = memorux.dispatch({ name: 'POST_ADD' })
    memorux.dispatch({ name: 'POST_CONGRATULATIONS', wait: [ postAddAction ] })

  })

  it("must be update multiple stores in order", (done) => {

    let initialState = {
      awoke: false,
    }

    let dispatch = ({ timeout, name }) => {
      return (state, action) => {
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

    let saraAction =
      memorux.dispatch({ name: 'SARA_GOOD_MORNING' })
    let jessicaAction =
      memorux.dispatch({ name: 'JESSICA_GOOD_MORNING', wait: [ saraAction ] })

    memorux.dispatch({ name: 'BARBARA_GOOD_MORNING',  wait: [ saraAction, jessicaAction ] })

  })


})
