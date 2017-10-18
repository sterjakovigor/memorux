![alt tag](https://raw.githubusercontent.com/sterjakovigor/memorux/master/logo.jpg)

# Memorux
Minimalistic state container for your [vqua](https://github.com/sterjakovigor/vqua) components

# Example

## Step 1. Declare your store

```javascript
class Cat {

  constructor() {

    this.state = {
      say: null
    }

  }

  dispatch(state, action) {

    switch (action.name) {

      case 'update': {

        return action.data

        break

      }

      default: {

        return action.data

      }

    }
  }

}
```

## Step 2. Assign your stores

```javascript
const memorux = require('memorux')

const memorux = new Memorux({ Cat })

memorux.store // => { Cat: { say: null } }
```

## Step 3. Dispatch action

```javascript
memorux.dispatch('Cat#update', { say: 'meow' })

// or

memorux.dispatch({
  name: 'Cat#update',
  data: { say: 'meow' }
})

// or

memorux.dispatch([
  {
    name: 'Cat#update',
    data: { say: 'meow' }
  },
])
```

## Step 4. Listen changes

```javascript
memorux.onChange(store =>

  // store => { Cat: { say: 'meow' } }

)
```

## Delayed actions

just return a promise like callback from your dispatch method

```javascript
class Cat {

  constructor() {

    this.state = {
      say: null
    }

  }

  dispatch(state, action) {

    switch (action.name) {

      case 'update': {

        return (resolve, reject) => {

          setImmediate(() => {

            resolve(action.data)

          })

        }

        break

      }

      default: {

        return action.data

      }

    }
  }

}
```
