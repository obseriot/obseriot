if ( ! expect ) var expect = require( 'expect.js' )
if ( ! obseriot ) var obseriot = require( '../dist/obseriot' )

var test = {
    handler : {
        name : 'test',
        action : function () {
            return [ 'This is a test' ]
        }
    },
    formatting : {
        handler : {
            name : 'formatting',
            action : function ( a1, a2, a3, a4, a5 ) {
                return [ 'This is a test', a1, a2, a3, a4, a5 ]
            }
        }
    },
    string : {
        handler : {
            name : 'string',
            equal : 'string',
            action : function ( arg ) {
                return test.string.handler.equal
            }
        }
    },
    object : {
        handler : {
            name : 'object',
            equal : { item : 'object' },
            action : function ( arg ) {
                return test.object.handler.equal
            }
        }
    },
    function : {
        handler : {
            name : 'function',
            equal : function () { return 'function' },
            action : function ( arg ) {
                return test.function.handler.equal
            }
        }
    }
}

describe( 'obseriot specs', function () {

    it( 'Observe by object', function ( done ) {
        obseriot.listen( test, function ( arg ) {
            expect( arg ).to.be.ok()
            done()
        } )
        obseriot.notify( test )
    } )

    it( 'Formatting of argument', function ( done ) {
        var args = [ 'test', 2, [ 3 ], { test : 5 }, function () { return 'test' } ]
        obseriot.listen( test.formatting, function ( f, a1, a2, a3, a4, a5 ) {
            expect( f ).to.eql( 'This is a test' )
            expect( a1 ).to.eql( args[ 0 ] )
            expect( a2 ).to.eql( args[ 1 ] )
            expect( a3 ).to.eql( args[ 2 ] )
            expect( a4 ).to.eql( args[ 3 ] )
            expect( a5 ).to.eql( args[ 4 ] )
            done()
        } )
        obseriot.notify( test.formatting, args[ 0 ], args[ 1 ], args[ 2 ], args[ 3 ], args[ 4 ] )
    } )

    it( 'Action returns value is whatever fine', function ( done ) {
        obseriot.listen( test.string, function ( arg ) {
            expect( arg ).to.eql( test.string.handler.equal )
        } )
        obseriot.listen( test.object, function ( arg ) {
            expect( arg ).to.eql( test.object.handler.equal )
        } )
        obseriot.listen( test.function, function ( arg ) {
            expect( arg ).to.eql( test.function.handler.equal )
            done()
        } )
        obseriot.notify( test.string )
        obseriot.notify( test.object )
        obseriot.notify( test.function )
    } )

} )
