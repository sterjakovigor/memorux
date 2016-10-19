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
        let date = action.date
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

let memorux = new Memorux({
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

## Step 5. Don't foorget to use spread opertor and properties transform in your babel config ;) 
https://babeljs.io/docs/plugins/transform-object-rest-spread/

https://babeljs.io/docs/plugins/transform-class-properties/

### P.S.
Inspired by redux, flux.
