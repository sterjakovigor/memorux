const { kindOf } = require('vqua-utils')

class Memorux {

  constructor(klasses = {}) {

    this.klasses = {}

    this.instances = Object.keys(klasses).reduce((instances, name) => {

      const Store = klasses[name]

      return Object.assign({}, instances, { [name]: new Store })

    }, {})

    this.store = Object.keys(this.instances).reduce((store, name) => {

      const instance = this.instances[name]

      return Object.assign({}, store, { [name]: instance.state })

    }, {})

    this._onChange = store => {}

  }

  onChange(callback) {

    this._onChange = callback

  }

  dispatch(actions, data = {}) {

    const type = kindOf(actions)

    switch (type) {

      case 'array': {

        return this.handleActions(actions)

        break

      }

      case 'object': {

        const action = actions

        return this.handleActions([action])

        break

      }

      case 'string': {

        const action = { name: actions, data }

        return this.handleActions([action])

        break

      }

      default: {

        throw new Error(
          'memorux.dispatch(action) must be array [] or ' +
          'object {} or string with object'
        )

      }

    }

  }

  handleActions(actions) {


    const withStoreNameActions = actions.map(action => {

      const nameSegments = action.name.split('#')

      const storeName = nameSegments[0]

      const actionName = nameSegments[1]

      if (!storeName || !actionName) throw new Error(
        'action.name must be Store#action format'
      )

      return Object.assign({}, action, {
        name: actionName,
        store: storeName,
      })

    })


    const dispatchedResults = withStoreNameActions.reduce((memo, action) => {

      const instance = this.instances[action.store]

      if (!instance) throw new Error(
        `Store "${action.store}" doesn\'t exist`
      )

      if (!('dispatch' in instance)) throw new Error(
        `Dispatch method in "${action.store}" store doesn\'t exist`
      )

      const result = instance.dispatch(this.store[action.store], action)

      const resultType = typeof result == 'function'
        ? 'asyncCallbacks'
        : 'syncResults'

      return Object.assign({}, memo, {
        [resultType]: Object.assign({}, memo[resultType], {
          [action.store]: result
        })
      })

    }, { syncResults: {}, asyncCallbacks: {} })


    const { syncResults, asyncCallbacks } = dispatchedResults


    if (Object.keys(syncResults).length) {

      this.store = Object.assign({}, this.store, syncResults)

      this._onChange(this.store)

    }

    return new Promise((resolve, reject) => {

      const asyncCallbacksKeys = Object.keys(asyncCallbacks)

      if (!asyncCallbacksKeys.length) return resolve()

      let resolveCount = 0

      asyncCallbacksKeys.forEach(storeName => {

        const callback = asyncCallbacks[storeName]

        new Promise(callback).then((state) => {

          this.store = Object.assign({}, this.store, {
            [storeName]: state
          })

          this._onChange(this.store)

          if (++resolveCount == asyncCallbacksKeys.length) {

            resolve(this.store)

          }

        })

      })


    })


  }

}

module.exports = Memorux
