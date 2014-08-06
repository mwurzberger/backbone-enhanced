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
    Backbone.Enhanced = {
        defaultOptions: {
            modelAccessorMethodsOn: true,
            modalMutatorsOn: true,
            modelNestedAttributesOn: true,
            modelVirtualProxyOn: true,
            collectionIterationOn: true,            
            collectionSubsetsOn: true
        },

        setEnhancedDefaults: function( options ){
            _.extend( defaultOptions, options );
        },
        
        // Based on function from https://github.com/jprichardson/string.js
        toCamelCase: function( inStr ) {
            return inStr.trim().replace( /(\-|_|\s|\.)+(.)?/g, function( mathc, sep, c ) {
                return ( c ? c.toUpperCase() : '' );
            } );
        }
    };

    var modelGet = Backbone.Model.prototype.get,
        modelSet = Backbone.Model.prototype.set;

    Backbone.Model = ( function( Model ) {        

        // Define the new constructor
        Backbone.Model = function( attributes, options ) {
            var attrs = attributes || {};
            options || (options = {});

            // Use the global defaults so that they can be overridden once in an application
            var enhancedOptions = _.extend( {}, Backbone.Enhanced.defaultOptions, options );

            // Mutators


            // Nested Object Access
            

            // Accessors
            // The accessors must be build last in order to include mutators and nested object short cuts
            if( enhancedOptions.modelAccessorMethodsOn ){
                var combinedAttrs = _.defaults( _.clone( attrs ), this.defaults );
                for ( var key in combinedAttrs ){
                    // Make sure that the key is not a prototype property and that it is not a blank value
                    // A blank value could end up in a get"" or set"" accessor that will call itself recursivly until the stack blows
                    if ( combinedAttrs.hasOwnProperty( key ) && key !== ""){
                        var getterName = Backbone.Enhanced.toCamelCase( "get " + key ),
                            setterName = Backbone.Enhanced.toCamelCase( "set " + key ),
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
                                console.log("Calling Wrapped Set for " + key);
                                this.set( key, newValue );
                            };
                        };

                        // Create boolean get method in the form of model.prefixAttrName()
                        if(  typeof combinedAttrs[ key ] === "boolean" ){
                            var prefixes = ['is', 'are', 'has', 'can', 'should', 'all', 'any'],
                                matchFound = false,
                                testKey = key.toLowerCase();
                            _.forEach( prefixes, function( prefix ){
                                // Check if the prefix is found at the begining attribute
                                if( testKey.indexOf(prefix) == 0){           
                                    // Make the new key and ensure that cases like hasvalidattrs become hasValidattrs                 
                                    this[ Backbone.Enhanced.toCamelCase( key.replace( prefix, prefix + "-" ) ) ] = wrappedGetFunc( key );
                                    matchFound = true;
                                    return false;
                                }
                            }, this);

                            // Use a default of model.isAttrName() if the attr name itself does not give a clue
                            if( !matchFound ){
                                this[ "is" + getterName.slice(3) ] = wrappedGetFunc( key );
                            }
                        } else {
                            // Create generic get method in the form of model.getAttrName()
                            this[ getterName ] = wrappedGetFunc( key );
                        }     

                        // Create generic set method in form of model.setAttrName( val, options )
                        this[ setterName ] = wrappedSetFunc( key );                   
                    }
                }
            }

            Model.apply( this, arguments );               
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