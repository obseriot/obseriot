const test = {
	handler: {
		name: 'test',
		action () {
			return [ 'This is a test' ]
		}
	},
	formatting: {
		handler: {
			name: 'formatting',
			action ( a1, a2, a3 ) {
				return [ 'This is a test', a1, a2, a3 ]
			}
		}
	},
	string: {
		handler: {
			name: 'string',
			equal: 'string',
			action () {
				return test.string.handler.equal
			}
		}
	},
	object: {
		handler: {
			name: 'object',
			equal: { item: 'object' },
			action () {
				return test.object.handler.equal
			}
		}
	},
	function: {
		handler: {
			name: 'function',
			equal () {
				return 'function'
			},
			action () {
				return test.function.handler.equal
			}
		}
	},
	once: {
		handler: {
			name: 'once',
			action () {
				return true
			}
		}
	},
	off: {
		handler: {
			name: 'off',
			action () {
				return true
			}
		}
	}
}

describe( 'obseriot specs', () => {
	it( 'Observe by object', done => {
		obseriot.listen( test, arg => {
			expect( arg ).to.be.ok()
			done()
		} )
		obseriot.notify( test )
	} )

	it( 'Formatting of argument', done => {
		const args = [ 'test', 2, [ 3 ], { test: 5 } ]
		obseriot.listen( test.formatting, ( f, a1, a2, a3 ) => {
			expect( f ).to.eql( 'This is a test' )
			expect( a1 ).to.eql( args[ 0 ] )
			expect( a2 ).to.eql( args[ 1 ] )
			expect( a3 ).to.eql( args[ 2 ] )
			done()
		} )
		obseriot.notify( test.formatting, args[ 0 ], args[ 1 ], args[ 2 ] )
	} )

	it( 'Action returns value is whatever fine', done => {
		obseriot.listen( test.string, arg => {
			expect( arg ).to.eql( test.string.handler.equal )
		} )
		obseriot.listen( test.object, arg => {
			expect( arg ).to.eql( test.object.handler.equal )
		} )
		obseriot.listen( test.function, arg => {
			expect( arg ).to.eql( test.function.handler.equal )
			done()
		} )
		obseriot.notify( test.string )
		obseriot.notify( test.object )
		obseriot.notify( test.function )
	} )

	it( 'Call the listener only once', () => {
		let count = 0
		obseriot.once( test.once, () => {
			count++
		} )
		obseriot.notify( test.once )
		obseriot.notify( test.once )

		expect( count ).to.be( 1 )
	} )

	it( 'Remove all listeners', () => {
		let count = 0
		obseriot.listen( test.off, () => {
			count++
		} )
		obseriot.listen( test.off, () => {
			count++
		} )
		obseriot.notify( test.off )
		obseriot.remove( test.off )
		obseriot.notify( test.off )

		expect( count ).to.be( 2 )
	} )

	it( 'Remove one listener', () => {
		let count = 0
		const countUpFirst = function () {
			count++
		}
		const countUpSecond = function () {
			count++
		}
		obseriot.listen( test.off, countUpFirst )
		obseriot.listen( test.off, countUpSecond )
		obseriot.notify( test.off )
		obseriot.remove( test.off, countUpFirst )
		obseriot.notify( test.off )

		expect( count ).to.be( 3 )
	} )
} )
