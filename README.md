# backbone-enhanced


Adding additional properties to backbone. Such as auto generating getter/setter methods for attributes and subcollections.


![Build Status](https://travis-ci.org/mwurzberger/backbone-enhanced.svg?branch=master)


## Installation

## Usage

Accessor methods for model attributes. 

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



TODO
----
Support for alternate boolean prefixes such as hasLicense(), canEvaluate(), and shouldHalt()
