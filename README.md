![alt tag](https://raw.githubusercontent.com/sterjakovigor/memorux/master/logo.jpg)

# Memorux
Simple state container for your react components

# Example

## Step 1. Declare your store

```javascript
class PostStore {

  initialStore = []

  dispatch(store, action) {
    switch (action.name) {
      case 'ADD_NEW_POST':
        let data = action.data
        [
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
````

## Step 2. Connect your stores

```javascript
import memorux from 'Memorux'

let memorux = new Memorux
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
        let date = action.date
        let newPosts = [
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
import memorux from 'Memorux'

class PostStore {
  initialState = {}

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

let memorux = new Memorux()

memorux.assignStores({ PostStore })

memorux.onChange = (store) => {
  console.log(store.PostStore.say)
}

let postAddAction =
  memorux.dispatch({ name: 'POST_ADD' })
memorux.dispatch({ name: 'POST_CONGRATULATIONS', wait: [ postAddAction ] })

// result:
// Post added!
// Congratulations!

```




## Don't foorget to use spread opertor and properties transform
https://babeljs.io/docs/plugins/transform-object-rest-spread/

https://babeljs.io/docs/plugins/transform-class-properties/

### P.S.
:heart: Inspired by redux, flux.
