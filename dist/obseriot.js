(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.obseriot = factory());
}(this, (function () { 'use strict';

var observable = function(el) {

  /**
   * Extend the original object or create a new empty one
   * @type { Object }
   */

  el = el || {};

  /**
   * Private variables
   */
  var callbacks = {},
    slice = Array.prototype.slice;

  /**
   * Public Api
   */

  // extend the el object adding the observable methods
  Object.defineProperties(el, {
    /**
     * Listen to the given `event` ands
     * execute the `callback` each time an event is triggered.
     * @param  { String } event - event id
     * @param  { Function } fn - callback function
     * @returns { Object } el
     */
    on: {
      value: function(event, fn) {
        if (typeof fn == 'function')
          { (callbacks[event] = callbacks[event] || []).push(fn); }
        return el
      },
      enumerable: false,
      writable: false,
      configurable: false
    },

    /**
     * Removes the given `event` listeners
     * @param   { String } event - event id
     * @param   { Function } fn - callback function
     * @returns { Object } el
     */
    off: {
      value: function(event, fn) {
        if (event == '*' && !fn) { callbacks = {}; }
        else {
          if (fn) {
            var arr = callbacks[event];
            for (var i = 0, cb; cb = arr && arr[i]; ++i) {
              if (cb == fn) { arr.splice(i--, 1); }
            }
          } else { delete callbacks[event]; }
        }
        return el
      },
      enumerable: false,
      writable: false,
      configurable: false
    },

    /**
     * Listen to the given `event` and
     * execute the `callback` at most once
     * @param   { String } event - event id
     * @param   { Function } fn - callback function
     * @returns { Object } el
     */
    one: {
      value: function(event, fn) {
        function on() {
          el.off(event, on);
          fn.apply(el, arguments);
        }
        return el.on(event, on)
      },
      enumerable: false,
      writable: false,
      configurable: false
    },

    /**
     * Execute all callback functions that listen to
     * the given `event`
     * @param   { String } event - event id
     * @returns { Object } el
     */
    trigger: {
      value: function(event) {
        var arguments$1 = arguments;


        // getting the arguments
        var arglen = arguments.length - 1,
          args = new Array(arglen),
          fns,
          fn,
          i;

        for (i = 0; i < arglen; i++) {
          args[i] = arguments$1[i + 1]; // skip first argument
        }

        fns = slice.call(callbacks[event] || [], 0);

        for (i = 0; fn = fns[i]; ++i) {
          fn.apply(el, args);
        }

        if (callbacks['*'] && event != '*')
          { el.trigger.apply(el, ['*', event].concat(args)); }

        return el
      },
      enumerable: false,
      writable: false,
      configurable: false
    }
  });

  return el

};

var o = new function () {
	observable( this );
}();

var obseriot = Object.defineProperties( {}, {
	observable: {
		value: o
	},
	listen: {
		value: function ( e, cb ) {
			if ( e === void 0 ) e = {};

			if ( !( 'handler' in e ) ) {
				return
			}
			o.on( e.handler.name, cb );
		},
		enumerable: false,
		writable: false,
		configurable: false
	},
	notify: {
		value: function ( e ) {
			var arg = [], len = arguments.length - 1;
			while ( len-- > 0 ) arg[ len ] = arguments[ len + 1 ];

			if ( e === void 0 ) e = {};
			if ( !( 'handler' in e ) ) {
				return
			}
			var t = [ e.handler.name ];
			var f = e.handler.action.apply( this, arg );
			if ( !Array.isArray( f ) ) {
				f = [ f ];
			}
			Array.prototype.push.apply( t, f );
			o.trigger.apply( this, t );
		},
		enumerable: false,
		writable: false,
		configurable: false
	},
	once: {
		value: function ( e, cb ) {
			if ( e === void 0 ) e = {};

			if ( !( 'handler' in e ) ) {
				return
			}
			o.one( e.handler.name, cb );
		},
		enumerable: false,
		writable: false,
		configurable: false
	},
	remove: {
		value: function ( e, cb ) {
			if ( e === void 0 ) e = {};

			if ( !( 'handler' in e ) ) {
				return
			}
			var t = [ e.handler.name ];
			if ( cb ) {
				t.push( cb );
			}
			o.off.apply( this, t );
		},
		enumerable: false,
		writable: false,
		configurable: false
	}
} );

return obseriot;

})));
