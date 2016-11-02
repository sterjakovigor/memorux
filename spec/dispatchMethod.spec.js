import Memorux from '../src/lib/Memorux'

describe("Dispatch method", () => {

  it("should update settings name", () => {

    class SettingsStore {

      initialState = {
        name: null
      }

      dispatch(state, action) {
        switch (action.name) {
          case 'UPDATE_SETTING_NAME':
            return {
              name: action.data.name
            }
            break
          default:
            return state
        }
      }

    }

    let memorux = new Memorux
    memorux.assignStores({ SettingsStore })

    expect(memorux.store.SettingsStore.name).toBe(null)

    memorux.onChange = (store) => {
      expect(store.SettingsStore.name).not.toBe(null)
    }

    memorux.dispatch({
      name: 'UPDATE_SETTING_NAME',
      data: {
        name: 'Igor Sterjakov'
      }
    })

  })

  it("should insert new post", () => {

    class PostStore {

      initialState = [
        { name: 'hello', description: 'world' }
      ]

      dispatch(state, action) {
        switch (action.name) {
          case 'ADD_EXAMPLE_POST':
            return [
              ...state,
              { name: 'example', description: 'post' }
            ]
            break
          default:
            return state
        }
      }

    }

    let memorux = new Memorux
    memorux.assignStores({ PostStore })

    expect(memorux.store.PostStore.length).toEqual(1)

    memorux.onChange = (store) => {
      expect(store.PostStore.length).toEqual(2)
    }

    memorux.dispatch({
      name: 'ADD_EXAMPLE_POST',
    })


  })


})