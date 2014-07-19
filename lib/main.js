"use strict";

( function( root, factory ) {
    if ( typeof define === 'function' && define.amd ) {
        // AMD. Register as an anonymous module.
        define( [ 'Backbone', 'lodash' ], factory )
    } else if ( typeof exports === 'object' ) {
        // CommonJS
        factory( require( 'backbone' ), require( 'lodash' ) )
    } else {
        // Browser globals
        factory( root.Backbone, root._ )
    }
}( this, function( Backbone, _ ) {
    Backbone.EnhancedUtils = {
        // Based on function from https://github.com/jprichardson/string.js
        toCamelCase: function( inStr ) {
            return inStr.trim().replace( /(\-|_|\s|\.)+(.)?/g, function( mathc, sep, c ) {
                return ( c ? c.toUpperCase() : '' );
            } );
        }
    };

    Backbone.Model = ( function( Model ) {
        // Define the new constructor
        Backbone.Model = function( attributes, options ) {
            // Your constructor logic here

            //TODO handle nested attributes?
            var allAttributes = _.defaults( _.clone( attributes ), this.defaults );
            for ( var key in allAttributes ) {
                if ( allAttributes.hasOwnProperty( key ) ) {
                    var getterName = Backbone.EnhancedUtils.toCamelCase( ( typeof allAttributes[ key ] === "boolean" ? "is " : "get " ) + key ),
                        setterName = Backbone.EnhancedUtils.toCamelCase( "set " + key ),
                        wrappedGetFunc,
                        wrappedSetFunc;

                    // Generate closure callbacks
                    wrappedGetFunc = function( key ) {
                        return function() {
                            return this.get( key );
                        };
                    };

                    wrappedSetFunc = function( key ) {
                        return function( newValue ) {
                            this.set( key, newValue );
                        };
                    };

                    // Apply the getter/setter pair to this model
                    this[ getterName ] = wrappedGetFunc( key );
                    this[ setterName ] = wrappedSetFunc( key );
                }
            }

            // Call the default constructor
            Model.apply( this, arguments );

            // Add some callbacks
            //this.on('event', this.myCallback, this);
        };

        // Clone static properties
        _.extend( Backbone.Model, Model );

        // Clone prototype
        Backbone.Model.prototype = ( function( Prototype ) {
            Prototype.prototype = Model.prototype;
            return new Prototype;
        } )( function() {} );

        // Update constructor in prototype
        Backbone.Model.prototype.constructor = Backbone.Model;
        return Backbone.Model;
    } )( Backbone.Model );

    // Update Backbone.Collection to use the new model type
    _.extend( Backbone.Collection.prototype, {
        model: Backbone.Model
    } );
} ) );