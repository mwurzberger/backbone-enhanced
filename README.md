# backbone-enhanced


Adding additional properties to backbone. Such as auto generating accessor methods for attributes.


![Build Status](https://travis-ci.org/mwurzberger/backbone-enhanced.svg?branch=master)


## Installation
npm install -g venus


## Usage

Accessor methods for model attributes following the traditional java pattern. Create getAttributeName() and setAttributeName( newValue ) for any attribute type. For boolean values it will also create isAttributeName(), hasAttributeName(), canAttributeName(), and shouldAttributeName() accessors.

Support attribute names in the following formats:

> "attribute name"

> "attribute-name"

> "attribute_name"

> "attribute.name"

> "attributeName"


Virtual Models

Any model can have a proxy_target passed in as an option. This will effectivly bind all of the virtual models methods to the target without creating a duplicate of the data. A get or set on either model will update both. This is of primary use when making collection subsets since the data should not be duplicated.

var TestModel = Backbone.Model.extend({
	defaults: {
		"test-attribute": "Test Attribute String"
	}
});

var TargetModel = new TestModel({
	"test-attribute": "Target Model Value"
});

var ProxyModel = new TestModel({}, {
	"proxy_target": TargetModel
});

// This should print "Test Attribute String"
console.log(TargetModel.get("test-attribute"));

ProxyModel.set("test-attribute", "Proxy Model Value");

// This should now print "Proxy Model Value"
console.log(TargetModel.get("test-attribute"));



Collection Subset


## Todo



Example:
Attribute name of {"shots-remaining": 10}
Getter .getShotsRemaining();
Seetter .setShotsRemaining( param );

Attribute name of {"clip-empty": false}
Getter .isClipEmpty();
Setter .setClipEmpty( param );



Subcollections
