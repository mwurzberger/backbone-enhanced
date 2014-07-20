# backbone-enhanced


Adding additional properties to backbone. Such as auto generating accessor methods for attributes.


![Build Status](https://travis-ci.org/mwurzberger/backbone-enhanced.svg?branch=master)


## Installation

## Usage

Accessor methods for model attributes following the traditional java pattern. Create getAttributeName() and setAttributeName( newValue ) for any attribute type. For boolean values it will also create isAttributeName(), hasAttributeName(), canAttributeName(), and shouldAttributeName() accessors.

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



Subcollections
