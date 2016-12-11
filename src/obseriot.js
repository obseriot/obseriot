import observable from 'riot-observable'

var o = new function () {
        observable( this )
    },
    obseriot = {}

Object.defineProperties( obseriot, {
    listen: {
        value: function ( e = {}, cb ) {
            if ( ! ( 'handler' in e ) ) return
            o.on( e.handler.name, cb )
        },
        enumerable: false,
        writable: false,
        configurable: false
    },
    notify: {
        value: function ( e = {}, ...arg ) {
            if ( ! ( 'handler' in e ) ) return
            let t = [ e.handler.name ],
                f = e.handler.action.apply( this, arg )
            if ( ! Array.isArray( f ) ) f = [ f ]
            Array.prototype.push.apply( t, f )
            o.trigger.apply( this, t )
        },
        enumerable: false,
        writable: false,
        configurable: false
    },
    once: {
        value: function ( e = {}, cb ) {
            if ( ! ( 'handler' in e ) ) return
            o.one( e.handler.name, cb )
        },
        enumerable: false,
        writable: false,
        configurable: false
    },
    remove: {
        value: function ( e = {}, cb ) {
            if ( ! ( 'handler' in e ) ) return
            let t = [ e.handler.name ]
            if ( cb ) t.push( cb )
            o.off.apply( this, t )
        },
        enumerable: false,
        writable: false,
        configurable: false
    },
    raw: {
        value: o
    }
} )

export default obseriot
