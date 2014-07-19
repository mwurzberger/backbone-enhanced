BackboneEnhancedUtils = {
    toCamelCase: function( inStr ) {
        // The regex will match the first character if it starts with a capital letter, 
        // and any alphabetic character following a space, hyphen, or underscore
        return inStr.replace( /^([A-Z])|[\s-_](\w)/g, function( match, p1, p2, offset ) {
            if ( p2 ) return p2.toUpperCase();
            return p1.toLowerCase();
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
                var getterName = BackboneEnhancedUtils.toCamelCase( ( typeof allAttributes[ key ] === "boolean" ? "is " : "get " ) + key ),
                    setterName = BackboneEnhancedUtils.toCamelCase( "set " + key ),
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