![alt tag](https://raw.githubusercontent.com/sterjakovigor/memorux/master/logo.jpg)

# Memorux
Simple state container for your [vqua](https://github.com/sterjakovigor/vqua) components

# Example

## Step 1. Declare your store

```javascript
class PostStore {

  constructor() {
    this.state = []
  }

  dispatch(store, action) {

    switch (action.name) {

      case 'ADD_NEW_POST':

        const data = action.data

        return [
          ...store,
          {
            title: data.title,
            description: data.description
          }
        ]

        break
    }
  }

}
```

## Step 2. Assign your stores

```javascript
const memorux = require('memorux')

const memorux = new Memorux

memorux.assignStores({
  PostsStore,
  UserStore,
  ExternalStore,
})
```

## Step 3. Dispatch action

```javascript
memorux.dispatch({
  name: 'ADD_NEW_POST',
  data: {
    title:       'Where is my catpower?',
    description: 'For the first time, a met catwooman in ...',
  }
})
```

## Step 4. Listen changes

```javascript
memorux.onChange = (store) => {
  console.log(store)
}
```

## Delayed actions
just return a function with resolve reject arguments

```javascript
class PostStore {

  initialStore = []

  dispatch(store, action) {

    switch (action.name) {

      case 'ADD_NEW_POST':

        const date = action.date

        const newPosts = [
          ...store,
          {
            title: data.title,
            description: data.description
          }
        ]

        return (resolve, reject) => {

          setTimeout(() => {

            resolve(newPosts)

          }, 1000)

        }

        break
    }
  }

}
````

### Waiting for delayed actions
```javascript
const memorux = require('memorux')

class PostStore {

  constructor() {

    this.state = {}

  }

  dispatch(state, action) {

    switch(action.name) {

      case 'POST_ADD':

        return (resolve, reject) => {

          setTimeout(() => {

            resolve({ say: 'Post added!' })

          }, 3000)

        }

        break

      case 'POST_CONGRATULATIONS':

        return (resolve, reject) => {

          setTimeout(() => {

            resolve({ say: 'Congratulations!' })

          }, 1000)

        }

        break
    }

  }

}

const memorux = new Memorux()

memorux.assignStores({ PostStore })

memorux.onChange = (store) => {
  console.log(store.PostStore.say)
}

const postAddAction = memorux.dispatch({ name: 'POST_ADD' })

memorux.dispatch({ name: 'POST_CONGRATULATIONS', wait: [ postAddAction ] })

// result:
// Post added!
// Congratulations!
```

## Get initial states by stores

```javascript

  class FirstStore { constructor() { this.state = 'first' } }

  class SecondStore { constructor() { this.state = 'second' } }

  const states = Memorux.getStates({ FirstStore, SecondStore })

  // states =>
  // { FirstStore: 'first', SecondStore: 'second' }

```
