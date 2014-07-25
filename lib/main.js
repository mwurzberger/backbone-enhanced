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
            var hasProxyTarget = false;

            // Handling Virtual Proxy Models
            options || (options = {});
            if (options.proxy_target !== undefined){
                hasProxyTarget = true;
                this.proxy_target = options.proxy_target;

                // TODO what about destroy/remove (only the proxy)

                // Loop through all the static methods of the Model.prototype and override
                // them for this model so that they point to the virtual proxy
                for (var prop in Model.prototype) {
                    if (Model.prototype.hasOwnProperty( prop )) {
                        // Enclose the function call to preserve the property name
                        var closureFunction = function( prop ) {
                            return function() {
                                return this.proxy_target[ prop ].apply( this.proxy_target, arguments );
                            };
                        };

                        // Map the property to the closure
                        this[ prop ] = closureFunction( prop );
                    }
                }
            }

            //TODO handle nested attributes here?
            var allAttributes = _.defaults( _.clone( attributes ), this.defaults );
            for ( var key in allAttributes ) {
                if ( allAttributes.hasOwnProperty( key ) ) {
                    var getterName = Backbone.EnhancedUtils.toCamelCase( "get " + key ),
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

                    // Apply the getter/setter accessors to this model
                    this[ getterName ] = wrappedGetFunc( key );
                    if(  typeof allAttributes[ key ] === "boolean" ){
                        this[ "is" + getterName.slice(3) ] = wrappedGetFunc( key );
                        this[ "has" + getterName.slice(3) ] = wrappedGetFunc( key );
                        this[ "can" + getterName.slice(3) ] = wrappedGetFunc( key );
                        this[ "should" +getterName.slice(3) ] = wrappedGetFunc( key );
                    }
                    this[ setterName ] = wrappedSetFunc( key );
                }
            }

            // Do not re-construct the target model
            if( !hasProxyTarget ){
                // Call the default constructor
                Model.apply( this, arguments );    
            }            
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


    Backbone.Collection = ( function( Collection ) {        

        // Define the new constructor
        Backbone.Collection = function( models, options ) {
            var hasProxyTarget = false;
            var shouldAcceptAddEvents = false;

            // Handling Virtual Proxy Models
            options || (options = {});
            if (options.proxy_target !== undefined){
                hasProxyTarget = true;
                this.proxy_target = options.proxy_target;

                // Define replacement methods
                this._addProxyModel = function( model, collection, options ){
                    console.log("Triggered Add Event from Master");
                    if( this.shouldAcceptAddEvents ){
                        console.log("I should also accept this add event");
                        var proxy_model = new model.constructor( model.toJSON(), {"proxy_target": model});
                        this.old_set( proxy_model, options );
                    }
                }

                // Propogate Upwards
                // Add
                this.old_set = this.set;
                this.set = function( models, options ){
                    this.shouldAcceptAddEvents = true;
                    this.proxy_target.set( models, options );
                    this.shouldAcceptAddEvents = false;
                }
                // Reset
                // Fetch (does it add and set?)
                // Create


                // Propogate Down
                // Remove
                // Reset?

                // Add all the callbacks
                this.proxy_target.on( "add", _.bind( this._addProxyModel, this ) );
            }

            // Call the default constructor
            Collection.apply( this, arguments );    
        };

        // Clone static properties
        _.extend( Backbone.Collection, Collection );

        // Clone prototype
        Backbone.Collection.prototype = ( function( Prototype ) {
            Prototype.prototype = Collection.prototype;
            return new Prototype;
        } )( function() {} );

        // Update constructor in prototype
        Backbone.Collection.prototype.constructor = Backbone.Collection;
        return Backbone.Collection;
    } )( Backbone.Collection );
} ) );