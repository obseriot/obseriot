import observable from 'riot-observable'

var o = new function () {
        observable( this )
    },
    obseriot = {}

Object.defineProperties( obseriot, {
    observable: {
        value: o
    },
    listen: {
        value: function ( e, cb ) {
            if ( ! e.handler ) return
            o.on( e.handler.name, cb )
        },
        enumerable: false,
        writable: false,
        configurable: false
    },
    notify: {
        value: function ( e, ...arg ) {
            if ( ! e.handler ) return
            let t = [ e.handler.name ],
                f = e.handler.action.apply( this, arg )
            if ( f.constructor.name !== 'Array' ) f = [ f ]
            Array.prototype.push.apply( t, f )
            o.trigger.apply( this, t )
        },
        enumerable: false,
        writable: false,
        configurable: false
    },
    once: {
        value: function ( e, cb ) {
            if ( ! e.handler ) return
            o.one( e.handler.name, cb )
        },
        enumerable: false,
        writable: false,
        configurable: false
    },
    remove: {
        value: function ( e, cb ) {
            if ( ! e.handler ) return
            let t = [ e.handler.name ]
            if ( cb ) t.push( cb )
            o.off.apply( this, t )
        },
        enumerable: false,
        writable: false,
        configurable: false
    }
} )

export default obseriot
