# backbone-enhanced


Adding additional properties to backbone. Such as auto generating accessor methods for attributes.


![Build Status](https://travis-ci.org/mwurzberger/backbone-enhanced.svg?branch=master)


## Installation

## Usage

Accessor methods for model attributes following the traditional java pattern. Create getAttributeName(), setAttributeName( newValue), and will change the boolean getter to an isAttributeName().

Support attribute names in the following formats:

> "attribute name"

> "attribute-name"

> "attribute_name"

> "attribute.name"

> "attributeName"


## Todo



Example:
Attribute name of {"shots-remaining": 10}
Getter .getShotsRemaining();
Seetter .setShotsRemaining( param );

Attribute name of {"clip-empty": false}
Getter .isClipEmpty();
Setter .setClipEmpty( param );


Support for alternate boolean prefixes such as hasLicense(), canEvaluate(), and shouldHalt()
Subcollections
