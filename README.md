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
var url = {
    change : {
        handler : {
            name : 'url_change',
            action : function ( collection, id, action ) {
                // Some processing and formatting
                return [ collection, id, action ]
            }
        }
    }
}
```

## Listen and Notify

```js
// obseriot.listen( event object , callback function )
obseriot.listen( url.change, function ( ...arg ) {
    console.log( arg ) // => 'shop', 1, 'detail'
} )

// obseriot.notify( event object , parameters )
obseriot.notify( url.change, 'shop', 1, 'detail' )
```

# How to use like Flux

Define Action

```js
var action = {}
export default action
```
```js
import action from 'action'

action.increment = {
    handler : {
        name : 'action_increment',
        action : function ( num = 1 ) {
            return [ num ]
        }
    }
}
```

Define Store

```js
var store = {}
export default store
```
```js
import store from 'store'
import obseriot from 'obseriot'

store.count = {
    state : 0,
    handler : {
        name : 'store_count',
        action : function () {
            return [ store.count.state ]
        }
    }
}

obseriot.listen( action.increment, function ( num ) {
    store.count.state = store.count.state + num
    obseriot.notify( store.count )
} )
```

Your Component

```js
import action from 'action'
import store from 'store'
import obseriot from 'obseriot'

// Action in somewhere components
obseriot.notify( action.increment, 1 )

// Listen to Store update
obseriot.listen( store.count, ( newCount ) => {
    console.log( newCount ) // => 1
} )
```

## Naming hint

All objects. You can name the simpler than Flux and Redux.

For example, common Todo action ...

```
addTodo
deleteTodo
editTodo... 😥
```

In Obseriot ...

```
action.todo.add
action.todo.delete
action.todo.edit
```

It will be simple! 😆
