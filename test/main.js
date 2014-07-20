// test/main.js
'use strict';

var _ = require('lodash/dist/lodash.underscore');
var Backbone = require('backbone');
var should = require('should');
var backbone_enhanced = require('../lib/main');

describe('backbone_enhanced', function(){
	describe('has a utilities set that', function(){
		it('should be able to camelCase convert a space deliniated string', function(){
			var result = Backbone.EnhancedUtils.toCamelCase("sample string to change");
			result.should.eql('sampleStringToChange')
		});

		it('should be able to camelCase convert a dash deliniated string', function(){
			var result = Backbone.EnhancedUtils.toCamelCase("sample-string-to-change");
			result.should.eql('sampleStringToChange')
		});

		it('should be able to camelCase convert a underscore deliniated string', function(){
			var result = Backbone.EnhancedUtils.toCamelCase("sample_string_to_change");
			result.should.eql('sampleStringToChange')
		});

		it('should be able to camelCase convert a dot deliniated string', function(){
			var result = Backbone.EnhancedUtils.toCamelCase("sample.string.to.change");
			result.should.eql('sampleStringToChange')
		});
	});

	describe('creates accessors that', function(){
		var TestModel = Backbone.Model.extend({
			defaults: {
				"test-attribute": "String Here"
			}
		})

		it('should create a getter for an attribute', function(){
			var result = new TestModel({ "test-attribute": 0 });
			result.getTestAttribute().should.equal( 0 );
		});

		it('should create setter for an attribute', function(){
			var result = new TestModel({ "test-attribute": 0 });
			result.setTestAttribute( 1 );
			result.getTestAttribute().should.equal( 1 );
		});

		it('should create an isAttribute getter for boolean attributes', function(){
			var result = new TestModel({ "valid-test": false });
			result.isValidTest().should.equal( false );
		});
	});

	describe('allows virtual models that', function(){
		it('should pass set attributes to the ')
	});
});