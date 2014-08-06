// test/main.js
"use strict";

var _ = require('lodash/dist/lodash.underscore');
var Backbone = require('backbone');
var should = require('should');
var Backbone_Enhanced = require('../backbone-enhanced');

describe('backbone-enhanced', function(){
	describe('has a utilities set that', function(){
		it('should be able to camelCase convert a space deliniated string', function(){
			var result = Backbone.Enhanced.toCamelCase("sample string to change");
			result.should.eql('sampleStringToChange')
		});

		it('should be able to camelCase convert a dash deliniated string', function(){
			var result = Backbone.Enhanced.toCamelCase("sample-string-to-change");
			result.should.eql('sampleStringToChange')
		});

		it('should be able to camelCase convert a underscore deliniated string', function(){
			var result = Backbone.Enhanced.toCamelCase("sample_string_to_change");
			result.should.eql('sampleStringToChange')
		});

		it('should be able to camelCase convert a dot deliniated string', function(){
			var result = Backbone.Enhanced.toCamelCase("sample.string.to.change");
			result.should.eql('sampleStringToChange')
		});
	});

	// Quick Backbone tests to make sure that inheritance works correctly.
	// Modified from the model.coffee test but without the crappy coffee syntax
	describe('maintains inheritance', function(){
		var Document = Backbone.Model.extend({
			fullname: function(){
				this.get('name') + ' ' + this.get('surname');
			}
		});

		var tempest = new Document({
			id: '1-the-tempest',
			title: "The Tempest",
			name: "William",
			surname: "Shakespeare",
			length: 123
		});

		it('should inhereit defined functions in new Models', function(){			
			tempest.fullName().should.equal("William Shakespeare");
			tempest.get('length').should.equal(123);
		});

			
		it('should support multiple levels of inheritance', function(){
			var ProperDocument = Document.extend({
				constructor: function(){
					ProperDocument.__super__.constructor.apply(this, arguments);
				},

				fullName: function(){
					return "Mr. " + ProperDocument.__super__.fullName.apply(this, arguments);
				}
			});

			var properTempest = new ProperDocument( tempest.attributes );
			properTempest.fullName().should.equal("Mr. William Shakespeare");
			properTempest.get('length').should.equal(123);
		});
	});

	describe('with accessors enabled', function(){
		var TestModel = Backbone.Model.extend({
			defaults: {
				"test-attribute": "String Here"
			}
		});

		it('should define a getAttribute function for an attribute', function(){
			var result = new TestModel({ "test-attribute": 0 });
			result.getTestAttribute().should.equal( 0 );
		});

		it('should define a setAttribute function for an attribute', function(){
			var result = new TestModel({ "test-attribute": 0 });
			result.set("test-attribute", 1 );
			result.getTestAttribute().should.equal( 1 );
		});

		it('should not create a getAttribute function for a boolean attribute', function(){
			var result = new TestModel({ "valid-test": false });
			should.notEqual( typeof( result.getValidTest ),  typeof(Function) );
		});

		it('should create a prefixed accessor function for a boolean attribute', function(){
			var result = new TestModel({ "valid-test": false });
			should.equal( typeof( result.isValidTest ),  typeof(Function) );
		});

		it('should create a isAttribute function for a boolean attribute', function(){
			var result = new TestModel({ "valid-test": false });
			result.isValidTest().should.equal( false );			
		});

		it('should create a isAttribute function for a boolean attribute starting with is', function(){
			var result = new TestModel({ "is-valid-test": false });
			result.isValidTest().should.equal( false );			
		});

		it('should create a areAttributes function for a boolean attribute starting with are', function(){
			var result = new TestModel({ "are-valid-tests": false });
			result.areValidTests().should.equal( false );			
		});

		it('should create a hasAttribute function for a boolean attribute starting with has', function(){
			var result = new TestModel({ "has-valid-test": false });
			result.hasValidTest().should.equal( false );			
		});

		it('should create a canAttribute function for a boolean attribute starting with can', function(){
			var result = new TestModel({ "can-valid-test": false });
			result.canValidTest().should.equal( false );			
		});

		it('should create a shouldAttribute function for a boolean attribute starting with should', function(){
			var result = new TestModel({ "should-valid-test": false });
			result.shouldValidTest().should.equal( false );			
		});

		it('should create a allAttributes function for a boolean attribute starting with all', function(){
			var result = new TestModel({ "all-valid-tests": false });
			result.allValidTests().should.equal( false );			
		});

		it('should create a anyAttributes function for a boolean attribute starting with any', function(){
			var result = new TestModel({ "any-valid-tests": false });
			result.anyValidTests().should.equal( false );			
		});

		// Test for cases where it is all lowercase or all uppercase and not delimited properly
		it('should create a prefixAttribute function for a boolean attribute starting with a valid prefix and no delimiter', function(){
			var result = new TestModel({ "hasvalidtests": false });
			result.hasValidtests().should.equal( false );			
		});
	});

	//TODO should there be a test for every function used by a collection
	describe('allows proxy models that', function(){
		// var TestModel = Backbone.Model.extend({
		// 	defaults: {
		// 		"test-attribute": "String Here"
		// 	}
		// });

		// var TargetModel = new TestModel({
		// 	"test-attribute": "Target Model Value"
		// });

		// var ProxyModel = new TestModel({}, {
		// 	"proxy_target": TargetModel
		// });

		// // get
		// it('should pass get calls to the proxy target', function(){
		// 	var targetAttr = TargetModel.get("test-attribute");
		// 	var proxyAttr = ProxyModel.get("test-attribute");
		// 	targetAttr.should.equal( proxyAttr );
		// });

		// // set
		// it('should pass set calls to the proxy target', function(){
		// 	var newValue = "Set Via Proxy";
		// 	ProxyModel.set("test-attribute", newValue);

		// 	var targetAttr = TargetModel.get("test-attribute");
		// 	var proxyAttr = ProxyModel.get("test-attribute");
		// 	targetAttr.should.equal( proxyAttr );
		// });

		// escape
		// has
		// unset
		// clear
		// id
		// idAttribute
		// cid
		// attributes
		// changed
		// defaults
		// toJSON
		// sync
		// fetch
		// save
		// destroys
		// Underscore Methods (keys, values, pairs, invert, pick, omit)
		// validate
		// validationError
		// isValid
		// url
		// urlRoot
		// parse
		// clone
		// isNew
		// hasChanged
		// changedAttributes
		// previous
		// previousAttributes


	});

	describe('allows subset collections that', function(){
		it('should contain only models in the parent collection', function(){

		});
		// toJSON
		// sync
		// add
		// remove
		// set
		// reset
		// push
		// pop
		// unshift
		// shift
		// slice
		// get
		// at
		// where
		// findWhere
		// sort
		// sortedIndex
		// pluck
		// create
		// parse
		// clone
		// 
	});
});