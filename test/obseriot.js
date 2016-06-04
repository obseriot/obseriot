var test = {
    handler : {
        name : 'test',
        action : function ( a1, a2, a3, a4, a5 ) {
            return [ 'This is a test', a1, a2, a3, a4, a5 ]
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
        obseriot.listen( test, function ( f, a1, a2, a3, a4, a5 ) {
            expect( f ).to.eql( 'This is a test' )
            expect( a1 ).to.eql( args[0] )
            expect( a2 ).to.eql( args[1] )
            expect( a3 ).to.eql( args[2] )
            expect( a4 ).to.eql( args[3] )
            expect( a5 ).to.eql( args[4] )
            done()
        } )
        obseriot.notify( test, args[0], args[1], args[2], args[3], args[4] )
    } )

} )
