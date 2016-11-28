import observable from 'riot-observable'

var obseriot = new function () {
    observable( this )
}

obseriot.listen = function ( e, cb ) {
    if ( ! e.handler ) return
    this.on( e.handler.name, cb )
}

obseriot.notify = function ( e, ...arg ) {
    if ( ! e.handler ) return
    let t = [ e.handler.name ],
        f = e.handler.action.apply( this, arg )
    if ( f.constructor.name !== 'Array' ) f = [ f ]
    Array.prototype.push.apply( t, f )
    this.trigger.apply( this, t )
}

obseriot.once = function ( e, cb ) {
    if ( ! e.handler ) return
    this.one( e.handler.name, cb )
}

obseriot.remove = function ( e, cb ) {
    if ( ! e.handler ) return
    let t = [ e.handler.name ]
    if ( cb ) t.push( cb )
    this.off.apply( this, t )
}

export default obseriot
