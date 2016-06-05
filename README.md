Simple observer pattern

# Installation

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

// obseriot.listen( event object , parameters )
obseriot.notify( url.change, 'shop', 1, 'detail' )
```