const rollup = require( 'rollup' )
const npm = require( 'rollup-plugin-node-resolve' )
const buble = require( 'rollup-plugin-buble' )

const name = 'obseriot'

rollup
.rollup( {
	entry: 'src/obseriot.js',
	plugins: [
		npm( { jsnext: true } ),
		buble()
	]
} )
.then( bundle => {
	bundle.write( { format: 'es', dest: `dist/${name}.es.js` } )
	bundle.write( { format: 'amd', dest: `dist/${name}.amd.js` } )
	bundle.write( {
		format: 'umd',
		dest: `dist/${name}.js`,
		moduleName: name
	} )
} )
.catch( err => {
	console.error( err )
} )
