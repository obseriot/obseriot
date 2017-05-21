import observable from 'riot-observable'

const o = new function () {
	observable( this )
}()

const obseriot = Object.defineProperties( {}, {
	observable: {
		value: o
	},
	listen: {
		value ( e = {}, cb ) {
			if ( !( 'handler' in e ) ) {
				return
			}
			o.on( e.handler.name, cb )
		},
		enumerable: false,
		writable: false,
		configurable: false
	},
	notify: {
		value ( e = {}, ...arg ) {
			if ( !( 'handler' in e ) ) {
				return
			}
			let f = e.handler.action( ...arg )
			if ( !Array.isArray( f ) ) {
				f = [ f ]
			}
			const t = [ e.handler.name, ...f ]
			o.trigger( ...t )
		},
		enumerable: false,
		writable: false,
		configurable: false
	},
	once: {
		value ( e = {}, cb ) {
			if ( !( 'handler' in e ) ) {
				return
			}
			o.one( e.handler.name, cb )
		},
		enumerable: false,
		writable: false,
		configurable: false
	},
	remove: {
		value ( e = {}, cb ) {
			if ( !( 'handler' in e ) ) {
				return
			}
			const t = [ e.handler.name ]
			if ( cb ) {
				t.push( cb )
			}
			o.off( ...t )
		},
		enumerable: false,
		writable: false,
		configurable: false
	}
} )

export default obseriot
