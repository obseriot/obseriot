Simple observer pattern

# Install

```
npm install obseriot
```

# Usage

## Define event

Object with a `handler.name` and `handler.action` .

- `handler.name` => Event name
- `handler.action` => Return the parameters to be provided to the listener
  - Array is provided as a variadic argument
  - Can be provide a variety of types. String, Object, Function, whatever

```js
const urlChange = {
    handler: {
        name: 'url_change',
        action ( collection, id, action ) {
            // Some processing and formatting
            return [ collection, id, action ]
        }
    }
}
```

## Listen and Notify

```js
// obseriot.listen( event object , callback function )
obseriot.listen( urlChange, ( ...arg ) => {
    console.log( arg ) // => 'shop', 1, 'detail'
} )

// obseriot.notify( event object , parameters )
obseriot.notify( urlChange, 'shop', 1, 'detail' )
```

One time listener

```js
// obseriot.once( event object , callback function )
obseriot.once( urlChange, ( ...arg ) => {
    console.log( arg )
} )
```

## Remove listeners

Remove all registered listeners.

```js
// obseriot.remove( event object )
obseriot.remove( urlChange )
```

Remove one registered listener.

```js
// obseriot.remove( event object, callback function )
const callback = ( ...arg ) => {
    console.log( arg )
}
obseriot.listen( urlChange, callback ) // Listen to the named function.
obseriot.remove( urlChange, callback ) // Remove!
```

# How to use like Flux

Define Action

```js
export const increment = {
    handler: {
        name: 'action_increment',
        action ( num = 1 ) {
            return [ num ]
        }
    }
}
```

Define Store

```js
import {increment} from './action/increment'
import obseriot from 'obseriot'

export const count = {
    state: 0,
    handler: {
        name: 'store_count',
        action () {
            return [ count.state ]
        }
    }
}

obseriot.listen( increment, num => {
    count.state = count.state + num
    obseriot.notify( count )
} )
```

Your Component

```js
import {increment} from './action/increment'
import {count} from './store/count'
import obseriot from 'obseriot'

// Action in somewhere components
obseriot.notify( increment, 1 )

// Listen to Store update
obseriot.listen( count, newCount => {
    console.log( newCount ) // => 1
} )
```
